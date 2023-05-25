import { User } from "./UserModel"
export interface LoginData{
    jwt: string
    user: User
}