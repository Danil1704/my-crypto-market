import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';
import { passwordMismatchValidator } from '../../shdared/password-mismatch-directive';
import { Auth } from '../../services/auth';
import { RegisterPostData } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CardModule, InputTextModule, PasswordModule, ButtonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private registerService = inject(Auth)
  private messageService = inject(MessageService);
  private router = inject(Router);
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-z0-9\._%+\+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/),
    ]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, {
     validators: passwordMismatchValidator
  });

  onRegister() {
    const postData = {...this.registerForm.value}
    delete postData.confirmPassword;
    this.registerService.registerUser(postData as RegisterPostData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registered successfuly',
        })
        this.router.navigate(['login'])
        console.log(response);
      },
      error: (err) => {
         this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        })
        console.log(err);
      },
    }); 
  }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

    get email() {
    return this.registerForm.controls['email'];
  }

    get password() {
    return this.registerForm.controls['password'];
  }

    get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
}
