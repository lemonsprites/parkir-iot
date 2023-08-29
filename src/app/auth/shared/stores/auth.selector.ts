import { AppState } from './../../../state/app.state';
import { AuthState } from '@App/shared/models/auth.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';





export const selectAuthFeature = createFeatureSelector<AppState, AuthState>('auth');

export const selectAuthUser = createSelector(
    selectAuthFeature,
    (state: AuthState) => state.user
);
// export const selectAuthUser = createSelector(
//   selectFeature,
//   (state: AuthState) => state.user
// );