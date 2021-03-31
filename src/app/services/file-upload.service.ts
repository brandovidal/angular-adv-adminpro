import { Injectable } from '@angular/core';
import { environment } from 'env/environment';
import { TypeFilesName } from 'interfaces';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  get token(): string {
    return localStorage.getItem('token') || ''
  }

  async updatePhoto(file: File, type: TypeFilesName, id: string) {
    try {
      const url = `${baseUrl}/api/upload/${type}/${id}`
      const formData = new FormData()
      formData.append('img', file)

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.token
        },
        body: formData
      })

      const data = await res.json()
      if (data.ok) {
        return data.name
      }
      return false

    } catch (error) {
      console.warn(error)
      return false
    }
  }
}
