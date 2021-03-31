import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'env/environment';
import { map } from 'rxjs/operators';
import { User } from 'models';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class SearchService {

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

  private tranformUsers(data: any[]): User[] {
    return data.map(user => new User({ ...user }))
  }

  search(type: 'hospital' | 'user' | 'doctor', term: string, since = 0, size = 100) {
    return this.http.get<any[]>(`${baseUrl}/api/search/collection/${type}/${term}?since=${since}&size=${size}`, this.headers)
      .pipe(
        map((res: any) => {
          switch (type) {
            case 'user':
              return this.tranformUsers(res.data)

            default:
              return [];
          }
        })
      )
  }
}
