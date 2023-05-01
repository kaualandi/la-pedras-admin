import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeasuresComponent } from '../measures.component';
import { IMeasure } from 'src/app/models/measure';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailMeasureComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MeasuresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMeasure,
    private fb: FormBuilder,
    private error: ErrorSanitazerService
  ) {}

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    abbreviation: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.data?.id) {
      this.form.patchValue(this.data);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  formHandleSubmit() {
    if (this.form.invalid) return;

    const measure = {
      ...this.data,
      ...this.form.value,
    };

    this.dialogRef.close(measure);
  }
}
