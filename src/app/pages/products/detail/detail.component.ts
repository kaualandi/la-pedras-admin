import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsComponent } from '../products.component';
import { IImage, IProduct } from 'src/app/models/product';
import { FormBuilder, Validators } from '@angular/forms';
import { IMeasure } from 'src/app/models/measure';
import { ICategory } from 'src/app/models/category';
import { MeasuresService } from 'src/app/services/measures.service';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailProductComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private measuresService: MeasuresService,
    private productsService: ProductsService,
    private error: ErrorSanitazerService
  ) {}

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    category_id: [0, [Validators.required]],
    measure_id: [0, [Validators.required]],
  });

  images: IImage[] = [];

  categories: ICategory[] = [];
  measures: IMeasure[] = [];

  ngOnInit(): void {
    if (this.data?.id) {
      this.form.patchValue(this.data);
      this.images = this.data.images;
    } else {
      this.form.patchValue({
        category_id: '' as any,
        measure_id: '' as any,
      });
    }

    this.getCategorys();
    this.getMeasures();
  }

  closeModal() {
    this.dialogRef.close();
  }

  formHandleSubmit() {
    if (this.form.invalid) return;

    const product = {
      ...this.data,
      ...this.form.value,
    };
    product.images = this.images;

    this.dialogRef.close(product);
  }

  removeImage(image: IImage) {
    if (image.id > 0) {
      this.productsService.deleteImage(image.id).subscribe({
        next: (res) => {
          console.log(res);
          this.images = this.images.filter((img) => img !== image);
        },
        error: (error) => {
          console.log(error);
          this.error.reqErrorSanitazer(error);
        },
      });
    } else {
      this.images = this.images.filter((img) => img !== image);
    }
  }

  newImage(image: string) {
    this.images.push({ id: 0, url: image } as IImage);
  }

  getCategorys() {
    this.categoriesService.getCategories('').subscribe({
      next: (categorys) => {
        this.categories = categorys;
      },
      error: (error) => {
        console.log(error);
        this.error.reqErrorSanitazer(error);
      },
    });
  }

  getMeasures() {
    this.measuresService.getMeasures().subscribe({
      next: (measures) => {
        this.measures = measures;
      },
      error: (error) => {
        console.log(error);
        this.error.reqErrorSanitazer(error);
      },
    });
  }
}
