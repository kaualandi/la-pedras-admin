import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/category';
import { CategoriesComponent } from '../categories.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailCategoryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICategory,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  formHandleSubmit() {
    if (this.form.invalid) return;

    const category = {
      ...this.data,
      ...this.form.value,
    };

    this.dialogRef.close(category);
  }
}
