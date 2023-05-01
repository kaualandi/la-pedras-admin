import { MatDialog } from '@angular/material/dialog';
import { ErrorSanitazerService } from './../../services/error-sanitazer.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { IReqError } from 'src/app/models/utils';
import { ProductsService } from 'src/app/services/products.service';
import { DetailProductComponent } from './detail/detail.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private error: ErrorSanitazerService,
    private snackbar: SnackbarService
  ) {}

  loading = false;

  products: IProduct[] = [];
  columns = ['name', 'price', 'category', 'actions'];

  ngOnInit(): void {
    this.loading = true;
    this.getProducts();
  }

  getProducts(name = '') {
    this.productsService.getProducts(name).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err: IReqError) => {
        this.error.reqErrorSanitazer(err);
        this.loading = false;
      },
    });
  }

  detailProduct(product: IProduct | null) {
    const dialogRef = this.dialog.open(DetailProductComponent, {
      data: { ...product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (result.id) {
        this.updateProduct(result);
        return;
      }
      this.createProduct(result);
    });
  }

  updateProduct(product: IProduct) {
    this.loading = true;
    this.productsService.updateProduct(product).subscribe({
      next: () => {
        this.getProducts();
        this.snackbar.success('Produto editado com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  createProduct(product: IProduct) {
    this.loading = true;
    this.productsService.createProduct(product).subscribe({
      next: () => {
        this.getProducts();
        this.snackbar.success('Produto criado com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  deleteProduct(product: IProduct) {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      data: {
        title: `Deletar ${product.name}?`,
        message:
          'Isso inclui todos os tipos, variações e imagens associadas a esse produto. Essa ação não pode ser desfeita!',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.loading = true;
      this.productsService.deleteProduct(product.id).subscribe({
        next: () => {
          this.getProducts();
          this.snackbar.success('Produto deletado com sucesso!');
        },
        error: (err: IReqError) => {
          this.loading = false;
          this.error.reqErrorSanitazer(err);
        },
      });
    });
  }
}
