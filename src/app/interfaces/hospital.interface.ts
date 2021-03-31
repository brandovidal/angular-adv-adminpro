import { IUser } from "./user.interface";

export interface IHospital {
  name: string
  img?: string
  user?: IUser
  uid?: string
}
