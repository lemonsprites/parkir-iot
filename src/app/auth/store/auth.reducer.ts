import { createReducer, on } from "@ngrx/store";
import { IAuthState } from "../shared/currentUser.interface";
import { registerAction } from "./auth.action";

const initialState: IAuthState = {
    user: null,
    roles: {
        admin: false,
        user: false
    }
}

const authReducer = createReducer(initialState, on(registerAction, (state): IAuthState => ({
    ...state,
    user: null,
    roles: {
        admin: false,
        user: false
    }
})));