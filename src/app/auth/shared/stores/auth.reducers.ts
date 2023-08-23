import { state } from '@angular/animations';

import * as AuthActions from '@App/auth/shared/stores/auth.actions';
import { AuthState } from '@App/auth/shared/interfaces/auth.interface';
import { createReducer, on } from '@ngrx/store';
import { UserInfo } from '@angular/fire/auth';

export const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user as UserInfo
        }
    }),
    on(AuthActions.authFail, (state, action) => {
        return {
            ...state,
            error: action.type
        }
    })
);