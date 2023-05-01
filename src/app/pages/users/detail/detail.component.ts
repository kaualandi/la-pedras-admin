import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersComponent } from '../users.component';
import { IUser } from 'src/app/models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailUserComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private fb: FormBuilder,
    private error: ErrorSanitazerService
  ) {}

  editPassword = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      this.editPassword ? [Validators.required, Validators.minLength(6)] : [],
    ],
    is_admin: [false, [Validators.required]],
  });

  ngOnInit(): void {
    if (this.data?.id) {
      this.form.patchValue({ ...this.data, password: '' });
    } else {
      this.toggleEditPass();
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  formHandleSubmit() {
    if (this.form.invalid) return;

    const user = {
      ...this.data,
      ...this.form.value,
    };

    this.dialogRef.close(user);
  }

  toggleEditPass() {
    this.editPassword = !this.editPassword;
    this.form.patchValue({ password: '' });

    if (this.editPassword) {
      this.form
        .get('password')
        ?.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      this.form.get('password')?.clearValidators();
    }
    this.form.get('password')?.updateValueAndValidity();
  }
}
