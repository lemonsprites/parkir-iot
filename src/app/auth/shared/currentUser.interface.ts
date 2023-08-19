import { UserInfo } from "@angular/fire/auth";

export interface IAuthState {
    user: UserInfo | null
    roles: {
        admin: boolean | false
        user: boolean | false
    }
}