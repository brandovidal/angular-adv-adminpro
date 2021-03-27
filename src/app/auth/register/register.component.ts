import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup
  formSubmited = false

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      name: ['Test', [Validators.required, Validators.minLength(2)]],
      email: ['test@correo.com', [Validators.required, Validators.email, Validators.minLength(4)]],
      password: ['123456', [Validators.required, Validators.minLength(3)]],
      repeatPassword: ['123456', [Validators.required, Validators.minLength(3)]],
      term: [true, [Validators.required]],
    }, {
      validators: this.samePasswords('password', 'repeatPassword')
    })
  }

  validField(field: string): boolean {
    return this.registerForm.get(field).invalid && this.formSubmited
  }

  validPasswords() {
    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('repeatPassword').value

    return pass1 !== pass2 && this.formSubmited
  }

  acceptTerms() {
    return !this.registerForm.get('term').value && this.formSubmited
  }

  samePasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name)
      const pass2Control = formGroup.get(pass2Name)

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ isNotSame: true })
      }
    }
  }

  createUser() {
    this.formSubmited = true

    if (this.registerForm.invalid) {
      console.info('Formluario no es  correcto')
      return;
    }

    this.userService.createUser(this.registerForm.value)
      .subscribe((res: any) => {
        console.info('res ', res)
        Swal.fire('Usuario registrado', `Usuario ${res.user.name} registrado`, 'info')

      }, err => {
        console.warn()
        Swal.fire('Error', err.error.msg, 'error')
      })
  }
}
