import { IDoctor, IHospital, IUser } from "interfaces"

export class Doctor {
  public name: string
  public img?: string
  public uid?: string
  public user?: IUser
  public hospital?: IHospital
  public _id?: string

  constructor(obj: IDoctor) {
    this.name = (obj && obj.name) || ''
    this.img = (obj && obj.img) || ''
    this.uid = (obj && obj.uid) || ''
    this.user = (obj && obj.user) || null
    this.hospital = (obj && obj.hospital) || null
    this._id = (obj && obj._id) || ''
  }
}
