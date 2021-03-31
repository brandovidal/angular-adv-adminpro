import { IHospital } from "./hospital.interface";
import { IUser } from "./user.interface";

export interface IDoctor {
  name: string
  img?: string
  user?: IUser
  hospital?: IHospital
  uid?: string
}
