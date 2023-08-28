import { AuthState } from '@App/shared/models/auth.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserData = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);