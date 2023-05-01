import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DetailCategoryComponent } from './detail/detail.component';
import { IReqError } from 'src/app/models/utils';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private error: ErrorSanitazerService,
    private snackbar: SnackbarService
  ) {}

  loading = false;

  categories: ICategory[] = [];
  columns = ['name', 'description', 'actions'];

  ngOnInit(): void {
    this.loading = true;
    this.getCategories();
  }

  getCategories(name = '') {
    this.categoriesService.getCategories(name).subscribe({
      next: (categories) => {
        this.categories = categories.map((category) => {
          return {
            ...category,
            description:
              category.description.length > 50
                ? category.description.slice(0, 50) + '...'
                : category.description,
          };
        });
        this.loading = false;
      },
      error: (err) => {
        this.error.reqErrorSanitazer(err);
        this.loading = false;
      },
    });
  }

  detailCategory(category: ICategory | null) {
    const dialogRef = this.dialog.open(DetailCategoryComponent, {
      data: { ...category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (result.id) {
        this.updateCategory(result);
        return;
      }
      this.createCategory(result);
    });
  }

  updateCategory(category: ICategory) {
    this.loading = true;
    this.categoriesService.updateCategory(category).subscribe({
      next: () => {
        this.getCategories();
        this.snackbar.success('Categoria editada com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  createCategory(category: ICategory) {
    this.loading = true;
    this.categoriesService.createCategory(category).subscribe({
      next: () => {
        this.getCategories();
        this.snackbar.success('Categoria criada com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  deleteCategory(category: ICategory) {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      data: {
        title: `Deletar ${category.name}?`,
        message: `Essa ação não pode ser desfeita!`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.loading = true;
      this.categoriesService.deleteCategory(category.id).subscribe({
        next: () => {
          this.getCategories();
          this.snackbar.success('Categoria deletada com sucesso!');
        },
        error: (err: IReqError) => {
          this.loading = false;
          this.error.reqErrorSanitazer(err);
        },
      });
    });
  }
}
