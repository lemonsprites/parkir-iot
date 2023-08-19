import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import * as AuthActions from './store/actions/auth.action';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap((action) =>
                this.authService.login(action.email, action.password).pipe(
                    map((user) => AuthActions.loginSuccess({ user })),
                    catchError((error) =>
                        of(AuthActions.loginFailure({ error }))
                    )
                )
            )
        )
    );

    constructor(private actions$: Actions, private authService: AuthService) {}
}
