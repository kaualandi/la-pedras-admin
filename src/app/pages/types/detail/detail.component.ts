import { Component, Inject, OnInit } from '@angular/core';
import { TypesComponent } from '../types.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IType } from 'src/app/models/type';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailTypeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TypesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IType,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private error: ErrorSanitazerService
  ) {}

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    product_id: [0, [Validators.required]],
  });

  products: IProduct[] = [];

  ngOnInit(): void {
    if (this.data?.id) {
      this.form.patchValue(this.data);
    } else {
      this.form.patchValue({
        product_id: '' as any,
      });
    }

    this.getProducts();
  }

  closeModal() {
    this.dialogRef.close();
  }

  formHandleSubmit() {
    if (this.form.invalid) return;

    const type = {
      ...this.data,
      ...this.form.value,
    };

    this.dialogRef.close(type);
  }

  getProducts() {
    this.productsService.getProducts('').subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.log(error);
        this.error.reqErrorSanitazer(error);
      },
    });
  }
}
