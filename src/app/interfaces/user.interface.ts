import { User } from "models";

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
  role?: string
  uid?: string
}
