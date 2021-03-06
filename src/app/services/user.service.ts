
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Router } from '@angular/router';
import { environment } from 'env/environment';

import { ILoginForm, IRegisterForm, ILoadUser, TypeRole } from 'interfaces';
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

  // GETERS
  get token(): string {
    return localStorage.getItem('token') || ''
  }

  get role(): TypeRole {
    return this.user.role || 'USER_ROLE'
  }

  get uid(): string {
    return this.user.uid || ''
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // LOCAL STORAGE
  saveLocalStorage(token: string, menu: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('menu', JSON.stringify(menu))
  }

  removeLocalStorage() {
    localStorage.removeItem('token')
    localStorage.removeItem('menu')
  }

  // FUNCTIONS
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
    this.removeLocalStorage()

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
        this.user = new User({ name, email, password: '', google, img, role, uid })
        this.saveLocalStorage(res.token, res.menu)
        return true
      }),
      catchError(() => of(false))
    )
  }

  login(formData: ILoginForm) {
    return this.http.post(`${baseUrl}/api/auth`, formData)
      .pipe(
        tap((res: any) => this.saveLocalStorage(res.token, res.menu))
      )
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/api/auth/google`, { token })
      .pipe(
        tap((res: any) => this.saveLocalStorage(res.token, res.menu))
      )
  }

  getUsers(since = 0, size = 5): Observable<ILoadUser> {
    return this.http.get<ILoadUser>(`${baseUrl}/api/users?since=${since}&size=${size}`, this.headers)
      .pipe(
        map(res => {
          const users = res.users.map(user => new User({ ...user }))
          return { users, total: res.total };
        })
      )
  }

  createUser(formData: IRegisterForm) {
    return this.http.post(`${baseUrl}/api/users`, formData)
      .pipe(
        tap((res: any) => this.saveLocalStorage(res.token, res.menu))
      )
  }

  updateUser(data: { name?: string, email?: string, role: string }) {
    data = {
      ...data,
      role: this.user.role
    }
    return this.http.put(`${baseUrl}/api/users/${this.uid}`, data, this.headers)
  }

  deleteUser(user: User) {
    console.log('deleteUser ', user)
    return this.http.delete(`${baseUrl}/api/users/${user.uid}`, this.headers)
  }

  editUser(data: User) {
    return this.http.put(`${baseUrl}/api/users/${data.uid}`, data, this.headers)
  }
}
