import { User } from "./UserModel"

export interface UserState {
    jwt?: string
    user?: User
    isLoggedIn:boolean 
    vendorId?:number
}

