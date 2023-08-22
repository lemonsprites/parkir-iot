import { UserInfo } from "@angular/fire/auth";

export interface AuthState {
    user: UserInfo | null,
    isLoading: boolean,
    error: string | null
}