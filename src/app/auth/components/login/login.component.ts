import * as AuthActions from '@App/auth/shared/stores/auth.actions';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    // loading = false

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })

    constructor(private store: Store) {

        console.log(AuthActions)
    }

    ngOnInit(): void {
        this.store.dispatch(AuthActions.loginInit())
        this.loginForm
    }

    loginSubmit() {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;

        this.store.dispatch(AuthActions.loginWithEmail({ email, password }));
    }

    loginGoogle() {
        this.store.dispatch(AuthActions.loginWithGoogle());
    }

}
