import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Doctor } from 'models';
import { environment } from 'env/environment';
import { IDoctor } from 'interfaces';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${baseUrl}/api/doctors`, this.headers)
      .pipe(map((res: any) => res.doctors))
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${baseUrl}/api/doctors/${id}`, this.headers)
      .pipe(map((res: any) => res.doctor))
  }

  createDoctor(doctor: IDoctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${baseUrl}/api/doctors`, { ...doctor }, this.headers)
      .pipe(map((res: any) => res.doctor))
  }

  updateDoctor(doctor: IDoctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${baseUrl}/api/doctors/${doctor.uid}`, { ...doctor }, this.headers)
      .pipe(map((res: any) => res.doctor))
  }

  deleteDoctor(uid: string) {
    return this.http.delete(`${baseUrl}/api/doctors/${uid}`, this.headers)
  }
}
