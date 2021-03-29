
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Router } from '@angular/router';
import { environment } from 'env/environment';

import { ILoginForm, IRegisterForm } from 'interfaces';
import { User } from 'models';

declare const gapi: any
const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth2: any
  public user: User

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.googleInit()
  }

  get token(): string {
    return localStorage.getItem('token') || ''
  }

  get uid(): string {
    return this.user.uid || ''
  }

  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: environment.googleId,
          cookiepolicy: 'single_host_origin',
        });
        resolve()
      });
    })
  };

  logout() {
    localStorage.removeItem('token')

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login')
      })
    });
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${baseUrl}/api/auth/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((res: any) => {
        const { name, email, google, img = '', role, uid } = res.user
        this.user = new User(name, email, '', google, img, role, uid)
        localStorage.setItem('token', res.token)
        return true
      }),
      catchError(() => of(false))
    )
  }

  createUser(formData: IRegisterForm) {
    return this.http.post(`${baseUrl}/api/users`, formData)
      .pipe(
        tap((res: any) => localStorage.setItem('token', res.token))
      )
  }

  updateUser(data: { name: string, email: string, role: string }) {
    data = {
      ...data,
      role: this.user.role
    }
    return this.http.put(`${baseUrl}/api/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  login(formData: ILoginForm) {
    return this.http.post(`${baseUrl}/api/auth`, formData)
      .pipe(
        tap((res: any) => localStorage.setItem('token', res.token))
      )
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/api/auth/google`, { token })
      .pipe(
        tap((res: any) => localStorage.setItem('token', res.token))
      )
  }
}
