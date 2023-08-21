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

    registerForm: any;
    isSubmit$: Observable<boolean>

    constructor(private store: Store) { }

    ngOnInit(): void {
        this.initRegisterForm();
    }

    initRegisterForm() {
        this.registerForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            password2: new FormControl('', [Validators.required]),
        }, confirmPass);
    }
}
