import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',

  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],

  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly loginForm = this.formBuilder.nonNullable.group({

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    password: ['', [
      Validators.required
    ]]
  });

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }

    const loginDetails =
      this.loginForm.getRawValue();

    this.authService.login(loginDetails).subscribe({

      next: response => {

        
        // I store that token in the angular browser so I can check
        // whether the user is logged in before allowing change
        localStorage.setItem(
          'token',
          response.token
        );

        console.log('Login successful');

        this.router.navigate(['/']);
      },

      error: error => {

        console.error(
          'Login failed',
          error
        );
      }

    });
  }
}