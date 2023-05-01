import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private error: ErrorSanitazerService
  ) {}

  loadings = {
    password: false,
  };

  user = this.storage.myself;

  userForm = this.fb.group({
    name: [this.user.name],
    email: [this.user.email],
    old_password: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    this.userForm.get('name')?.disable();
    this.userForm.get('email')?.disable();
  }

  handleChangePasswordSubmit() {
    if (this.userForm.invalid) return;

    if (
      this.userForm.value.password !== this.userForm.value.password_confirmation
    ) {
      this.snackbar.success('As senhas não conferem');
      this.userForm.get('password')?.setErrors({ mismatch: true });
      this.userForm.get('password_confirmation')?.setErrors({ mismatch: true });
      return;
    }

    const oldPass = this.userForm.value.old_password || '';
    const newPass = this.userForm.value.password || '';

    this.loadings.password = true;
    this.authService.changePassword(oldPass, newPass).subscribe({
      next: () => {
        this.userForm.patchValue({
          old_password: '',
          password: '',
          password_confirmation: '',
        });
        this.userForm.get('old_password')?.setErrors(null);
        this.userForm.get('password')?.setErrors(null);
        this.userForm.get('password_confirmation')?.setErrors(null);
        this.loadings.password = false;
        this.snackbar.success('Senha alterada com sucesso');
      },
      error: (err) => {
        this.loadings.password = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  forgotPass() {
    this.snackbar.info(
      this.user.is_admin
        ? 'Altere sua senha pelo painel de usuários'
        : 'Entre em contato com um administrador para alterar sua senha'
    );
  }
}
