import { registerAction } from '@App/auth/store/auth.action';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
    selector: 'piot-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    loading: boolean = false;

    constructor(private fb: FormBuilder, private store: Store) { }

    ngOnInit(): void {
        this.initRegisterForm();
    }


    initRegisterForm() {
        console.log('Form init')
        this.registerForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            password2: ['', Validators.required]
        })
    }

    registerSubmit() {
        console.log(this.registerForm.value)
        this.loading = true
        setTimeout(() => {
            this.loading = false

            console.log(this.registerForm);
            this.store.dispatch(registerAction(this.registerForm.value))
        }, 2000)
    }


}
