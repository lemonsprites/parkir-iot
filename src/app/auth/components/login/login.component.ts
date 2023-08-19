import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm!: FormGroup;
    loading: boolean = false;


    constructor(private fb: FormBuilder, private store: Store) {
        this.initLoginForm()
    }

    initLoginForm() {
        console.log('Form init')
        this.loginForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
    }

    loginSubmit() {
        console.log(this.loginForm.value)
        this.loading = true
        setTimeout(() => {
            this.loading = false

            console.log(this.loginForm);

            this.loginForm.markAsUntouched()
        }, 2000)
    }
}
