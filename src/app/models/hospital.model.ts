import { IHospital, IUser } from "interfaces"

export class Hospital {
  public name: string
  public img?: string
  public uid?: string
  public user?: IUser

  constructor(obj: IHospital) {
    this.name = (obj && obj.name) || ''
    this.img = (obj && obj.img) || ''
    this.uid = (obj && obj.uid) || ''
    this.user = (obj && obj.user) || null
  }
}
