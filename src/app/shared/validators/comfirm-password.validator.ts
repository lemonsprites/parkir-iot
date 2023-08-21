import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const confirmPass: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return control.value.password === control.value.password2 ? null : {PasswordNotMatch: true}
}