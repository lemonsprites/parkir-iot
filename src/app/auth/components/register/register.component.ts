import * as AuthActions from '@App/auth/shared/stores/auth.actions';
import { confirmPass } from '@App/shared/validators/comfirm-password.validator';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'piot-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    constructor(private store: Store) {}

    registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
    }, confirmPass);

    ngOnInit(): void {
        this.store.dispatch(AuthActions.registerInit())
        this.registerForm
    }

    registerSubmit() {
        const email = this.registerForm.get('email').value;
        const password = this.registerForm.get('password').value;

        this.store.dispatch(AuthActions.register({ email, password }));
    }
}
