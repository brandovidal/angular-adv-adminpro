import { environment } from "env/environment"

const baseUrl = environment.baseUrl

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public img?: string,
    public role?: string,
    public uid?: string
  ) { }

  get imgUrl() {
    // api/upload/users/no-image
    if (this.img.includes('https')) {
      return this.img
    }
    return this.img ? `${baseUrl}/api/upload/users/${this.img}` : `${baseUrl}/api/upload/users/no-image`
  }
}
