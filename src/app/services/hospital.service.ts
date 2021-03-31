import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'env/environment';
import { Hospital } from 'models';
import { IHospital } from 'interfaces';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  getHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${baseUrl}/api/hospitals`, this.headers)
      .pipe(map((res: any) => res.hospitals))
  }

  createHospital(name: string): Observable<Hospital> {
    return this.http.post<Hospital>(`${baseUrl}/api/hospitals`, { name }, this.headers)
      .pipe(map((res: any) => res.hospital))
  }

  updateHospital(hospital: IHospital): Observable<Hospital> {
    return this.http.put<Hospital>(`${baseUrl}/api/hospitals/${hospital.uid}`, { ...hospital }, this.headers)
      .pipe(map((res: any) => res.hospital))
  }

  deleteHospital(uid: string) {
    return this.http.delete(`${baseUrl}/api/hospitals/${uid}`, this.headers)
  }
}
