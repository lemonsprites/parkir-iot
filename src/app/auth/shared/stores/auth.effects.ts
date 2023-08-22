import { register } from './auth.actions';
import { AuthService } from '@App/auth/shared/auth.service';
import * as AuthActions from '@App/auth/shared/stores/auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';


@Injectable()
export class AuthEffects {

    constructor(private authService: AuthService, private action$: Actions) { }

    login$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.loginWithEmail),
            switchMap(action =>
                this.authService.loginFn(action.email, action.password).pipe(
                    map(mapUser => AuthActions.loginSuccess({ user: mapUser.user })),
                    catchError(err => of(AuthActions.authFail({ error: err.message })))
                )
            )
        )
    );

    loginWithGoogle$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.loginWithGoogle),
            switchMap(action =>
                this.authService.loginWithGoogleFn().pipe(
                    map(mapUser => AuthActions.loginSuccess({ user: mapUser.user })),
                    catchError(err => of(AuthActions.authFail({ error: err })))
                )
            )
        )
    )

    registerWithEmail$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.register),
            switchMap(action =>
                this.authService.registerFn(action.email, action.password).pipe(
                    map(mapUser => AuthActions.registerSuccess({ user: mapUser.user })),
                    catchError(err => of(AuthActions.authFail({ error: err })))
                )
            )
        )
    )
}