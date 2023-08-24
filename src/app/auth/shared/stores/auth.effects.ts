import { ToastService } from '@App/toast/toast.service';
import { IUser } from './../interfaces/auth.interface';
import { register } from './auth.actions';
import { AuthService } from '@App/auth/shared/auth.service';
import * as AuthActions from '@App/auth/shared/stores/auth.actions';
import { Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';


@Injectable()
export class AuthEffects {

    constructor(private authService: AuthService, private action$: Actions, private toast: ToastService) { }

    private mapUserCred(credentials: UserCredential): IUser {
        return {
            displayName: credentials.user.displayName,
            email: credentials.user.email,
            photoURL: credentials.user.photoURL,
            uid: credentials.user.uid,
            phoneNumber: credentials.user.phoneNumber,
        };
    }

    login$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.loginWithEmail),
            switchMap(action =>
                this.authService.loginFn(action.email, action.password).pipe(
                    map(credentials => this.mapUserCred(credentials)),
                    map(mapUser => {
                        this.toast.showToast("Info Guys!", "Kamu berhasil masuk aplikasi!")
                        return AuthActions.loginSuccess({ user: mapUser })}),
                    catchError(err => {
                        this.toast.showToast("Error Guys!", err.message)
                        return of(AuthActions.authFail({ error: err.message }))
                    })
                )
            )
        )
    );

    loginWithGoogle$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.loginWithGoogle),
            switchMap(action =>
                this.authService.loginWithGoogleFn().pipe(
                    map(credentials => this.mapUserCred(credentials)),
                    map(mapUser => {
                        this.toast.showToast("Info Guys!", "Kamu berhasil masuk aplikasi!")
                        return AuthActions.loginSuccess({ user: mapUser })}),
                    catchError(err => {
                        this.toast.showToast("Error Guys!", err.message)
                        return of(AuthActions.authFail({ error: err }))
                    })
                )
            )
        )
    )

    registerWithEmail$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.register),
            switchMap(action =>
                this.authService.registerFn(action.email, action.password).pipe(
                    map(mapUser => {
                        this.toast.showToast("Info Guys!", "Kamu berhasil daftar!")
                        return AuthActions.registerSuccess({ user: mapUser.user })}),
                    catchError(err => {
                        this.toast.showToast("Error Guys!", err.message)

                        return of(AuthActions.authFail({ error: err }))
                    })
                )
            )
        )
    )
}