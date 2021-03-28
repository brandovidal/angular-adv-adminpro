import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

declare const gapi: any

import { environment } from 'env/environment'

import { UserService } from 'services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth2: any

  loginForm: FormGroup
  formSubmited = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone,
  ) {
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      remember: [false, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.renderButton()
  }

  validField(field: string): boolean {
    return this.loginForm.get(field).invalid && this.formSubmited
  }

  login() {
    this.formSubmited = true
    console.info('loginForm ', this.loginForm.value)

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value)
      .subscribe(async (res: any) => {
        console.info('res ', res)
        await Swal.fire('Login realizado', `Login realizado`, 'info')

        const { value: remember } = this.loginForm.get('remember')
        const { value: email } = this.loginForm.get('email')

        remember ? localStorage.setItem('email', email) : localStorage.removeItem('email')
        this.router.navigateByUrl('/')

      }, err => {
        console.warn('err ', err.error?.msg)
        Swal.fire('Error', err.error.msg, 'error')
      })

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp()
  }

  async startApp() {
    await this.userService.googleInit()
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: environment.googleId,
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.auth2 = this.userService.auth2
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const { id_token: token } = googleUser.getAuthResponse()

        this.userService.loginGoogle(token)
          .subscribe(() => {
            this.ngZone.run(() => this.router.navigateByUrl('/'))
          }, err => {
            console.warn('err ', err.error?.msg)
            Swal.fire('Error', err.error.msg, 'error')
          })
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}
