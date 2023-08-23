import { UserInfo } from "@angular/fire/auth";

export interface IUser {
    displayName: string | null
    email: string | null,
    photoURL: string | null
    uid: string
    phoneNumber: string | null
};

export interface AuthState {
    user: IUser | null,
    isLoading: boolean,
    error: string | null
}