import { User } from "models";
import { TypeRole } from "./util.interface";

export interface ILoadUser {
  total: number
  users: User[]
}

export interface IUser {
  name: string
  email: string
  password?: string
  google?: boolean
  img?: string
  role?: TypeRole
  uid?: string
}
