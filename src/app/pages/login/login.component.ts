import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storage: StorageService,
    private error: ErrorSanitazerService,
    private router: Router
  ) {}

  loading = false;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  loginHandleSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email || '', password || '').subscribe({
      next: (res) => {
        this.storage.setToken(res.access_token);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error.reqErrorSanitazer(err);
        this.loading = false;
      },
    });
  }
}
