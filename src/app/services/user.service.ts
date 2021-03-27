
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { IRegisterForm } from '../interfaces/register-form.interface';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(formData: IRegisterForm) {
    return this.http.post(`${baseUrl}/api/users`, formData)
  }
}
