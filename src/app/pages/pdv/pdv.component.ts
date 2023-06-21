import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentTypesComponent } from 'src/app/components/pdv/payment-types/payment-types.component';
import { IProduct } from 'src/app/models/product';
import { IReqError } from 'src/app/models/utils';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pdv',
  templateUrl: './pdv.component.html',
  styleUrls: ['./pdv.component.scss'],
})
export class PdvComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private error: ErrorSanitazerService,
    private dialog: MatDialog
  ) {}

  products: IProduct[] = [];

  ngOnInit(): void {
    this.getProducts();

    this.dialog.open(PaymentTypesComponent);
  }

  getProducts() {
    this.productsService.getProducts('').subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err: IReqError) => {
        this.error.reqErrorSanitazer(err);
      },
    });
  }
}
