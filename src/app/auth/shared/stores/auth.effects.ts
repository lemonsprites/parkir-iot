import { ToastService } from '@App/toast/toast.service';
import { IUser } from '../../../shared/models/auth.model';
import { register } from './auth.actions';
import { AuthService } from '@App/auth/shared/auth.service';
import * as AuthActions from '@App/auth/shared/stores/auth.actions';
import { Injectable } from '@angular/core';
import { User, UserCredential, updateProfile } from '@angular/fire/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { getDownloadURL, ref as data, Storage } from '@angular/fire/storage';


@Injectable()
export class AuthEffects {

    constructor(private authService: AuthService, private action$: Actions, private toast: ToastService, private route: Router, private storage: Storage) { }

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
                        localStorage.setItem('user', JSON.stringify(mapUser))
                        this.route.navigate(['user/dashboard'])
                        return AuthActions.loginSuccess({ user: mapUser })
                    }),
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
                        localStorage.setItem('user', JSON.stringify(mapUser))
                        this.authService.addUser(mapUser)
                        this.route.navigate(['user/dashboard'])
                        return AuthActions.loginSuccess({ user: mapUser })
                    }),
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
                this.authService.registerFn(action.email, action.password, action.displayName).pipe(
                    map(credentials => this.mapUserCred(credentials)),
                    map(mapUser => {

                        this.toast.showToast("Info Guys!", "Kamu berhasil daftar!")
                        this.authService.addUser(mapUser)
                        this.authService.logoutFn()
                        this.route.navigate(['/login'])
                        return AuthActions.registerSuccess({ user: mapUser })
                    }),
                    catchError(err => {
                        this.toast.showToast("Error Guys!", err.message)

                        return of(AuthActions.authFail({ error: err }))
                    })
                )
            )
        )
    )
}