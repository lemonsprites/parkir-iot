import { AuthState } from "@App/shared/models/auth.model";

export interface AppState {
    app: AppState,
    // admin: AdminState,
    auth: AuthState
}