import { environment } from "env/environment"
import { IUser } from "interfaces"

const baseUrl = environment.baseUrl

export class User {
  public name: string
  public email: string
  public password?: string
  public google?: boolean
  public img?: string
  public role?: string
  public uid?: string

  constructor(obj: IUser) {
    this.name = (obj && obj.name) || ''
    this.email = (obj && obj.email) || ''
    this.password = (obj && obj.password) || ''
    this.google = (obj && obj.google) || false
    this.img = (obj && obj.img) || ''
    this.role = (obj && obj.role) || ''
    this.uid = (obj && obj.uid) || ''
  }

  get imgUrl() {
    if (!this.img) {
      return `${baseUrl}/api/upload/users/no-image`
    } else if (this.img.includes('https')) {
      return this.img
    }
    return this.img ? `${baseUrl}/api/upload/users/${this.img}` : `${baseUrl}/api/upload/users/no-image`
  }
}
