import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { IType } from 'src/app/models/type';
import { IReqError } from 'src/app/models/utils';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TypesService } from 'src/app/services/types.service';
import { DetailTypeComponent } from './detail/detail.component';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {
  constructor(
    private typesService: TypesService,
    private dialog: MatDialog,
    private error: ErrorSanitazerService,
    private snackbar: SnackbarService
  ) {}

  loading = false;

  types: IType[] = [];
  columns = ['name', 'price', 'product', 'actions'];

  ngOnInit(): void {
    this.loading = true;
    this.getTypes();
  }

  getTypes(name = '') {
    this.typesService.getTypes(name).subscribe({
      next: (types) => {
        this.types = types;
        this.loading = false;
      },
      error: (err: IReqError) => {
        this.error.reqErrorSanitazer(err);
        this.loading = false;
      },
    });
  }

  detailType(types: IType | null) {
    const dialogRef = this.dialog.open(DetailTypeComponent, {
      data: { ...types },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (result.id) {
        this.updateType(result);
        return;
      }
      this.createType(result);
    });
  }

  updateType(types: IType) {
    this.loading = true;
    this.typesService.updateType(types).subscribe({
      next: () => {
        this.getTypes();
        this.snackbar.success('Tipo editado com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  createType(type: IType) {
    this.loading = true;
    this.typesService.createType(type).subscribe({
      next: () => {
        this.getTypes();
        this.snackbar.success('Tipo criado com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  deleteType(type: IType) {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      data: {
        title: `Deletar ${type.name}?`,
        message: 'Essa ação não pode ser desfeita!',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.loading = true;
      this.typesService.deleteType(type.id).subscribe({
        next: () => {
          this.getTypes();
          this.snackbar.success('Tipo deletado com sucesso!');
        },
        error: (err: IReqError) => {
          this.loading = false;
          this.error.reqErrorSanitazer(err);
        },
      });
    });
  }
}
