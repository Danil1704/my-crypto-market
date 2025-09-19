import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMismatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('onfirmPassword');
    
    return password && confirmPassword && password.value !== confirmPassword.value ? {passwordMismatch: true} : null;
}