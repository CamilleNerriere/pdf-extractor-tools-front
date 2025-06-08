import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { UserLogin } from '../../models/userLogin';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);
  private jwtService = inject(JwtService);
 
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(8)])
  })

  hiddenPwd = true;

  showToast = signal(false);
  errorMessage = signal('');

  setInvalidValues(message : string){
    this.showToast.set(true);
    this.errorMessage.set(message);
  }

  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    if (email && password) {
      const userLogin: UserLogin = {
        email, password
      }
      this.authService.login(userLogin).subscribe({
        next: response => {
          this.jwtService.setToken(response.token);
        },
        error: error => {
          if (error.error.status === 401) {
            this.setInvalidValues("Email ou mot de passe invalide.");
          } else {
            this.setInvalidValues(error.error.message);
          }
        },
        complete: () => this.router.navigate(['extract'])
      });
    } else {
      this.setInvalidValues("Email ou mot de passe invalide.");
    }
  }

}
