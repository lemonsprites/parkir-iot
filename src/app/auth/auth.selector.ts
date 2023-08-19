import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '@App/auth/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state) => state.user !== null
);
