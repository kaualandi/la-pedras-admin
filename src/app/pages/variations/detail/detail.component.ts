import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/product';
import { IVariation } from 'src/app/models/variation';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { ProductsService } from 'src/app/services/products.service';
import { VariationsComponent } from './../variations.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailVariationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<VariationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IVariation,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private error: ErrorSanitazerService
  ) {}

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    image: ['', [Validators.required]],
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

    const variation = {
      ...this.data,
      ...this.form.value,
    };

    this.dialogRef.close(variation);
  }

  newImage(image: string) {
    this.form.patchValue({
      image,
    });
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
