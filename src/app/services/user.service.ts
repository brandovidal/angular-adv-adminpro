
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'env/environment';
import { ILoginForm, IRegisterForm } from 'interfaces';
import { Router } from '@angular/router';

declare const gapi: any
const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth2: any

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.googleInit()
  }


  googleInit() {
    return new Promise<void>(resolve => {
      console.log('googleInit');

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
    const token = localStorage.getItem('token') || ''
    return this.http.get(`${baseUrl}/api/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => localStorage.setItem('token', res.token)),
      map(res => true),
      catchError(error => of(false))
    )
  }

  createUser(formData: IRegisterForm) {
    return this.http.post(`${baseUrl}/api/users`, formData)
      .pipe(
        tap((res: any) => localStorage.setItem('token', res.token))
      )
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
