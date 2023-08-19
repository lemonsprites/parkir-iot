export interface IUser {
    uid: string | null
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
    roles: string[];
}
