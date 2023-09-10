import * as AuthActions from '@App/auth/shared/stores/auth.actions';
import { confirmPass } from '@App/shared/validators/comfirm-password.validator';
import { Component, OnInit } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'piot-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    downloadLink: string | null;

    constructor(
        private store: Store,
        private route: Router,
        private storage: Storage
    ) { }

    registerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
    }, confirmPass);

    ngOnInit(): void {
        this.store.dispatch(AuthActions.registerInit())
        this.registerForm
        if (JSON.parse(localStorage.getItem('user')) !== null) {
            this.route.navigate(['user'])
        }
    }

    registerSubmit() {
        const name = this.registerForm.get('name').value;
        const email = this.registerForm.get('email').value;
        const password = this.registerForm.get('password').value;

        this.store.dispatch(AuthActions.register({ email, password, displayName: name }));
    }



}
