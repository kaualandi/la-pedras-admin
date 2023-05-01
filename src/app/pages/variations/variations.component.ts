import { VariationsService } from './../../services/variations.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IVariation } from 'src/app/models/variation';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DetailVariationComponent } from './detail/detail.component';
import { IReqError } from 'src/app/models/utils';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-variations',
  templateUrl: './variations.component.html',
  styleUrls: ['./variations.component.scss'],
})
export class VariationsComponent implements OnInit {
  constructor(
    private variationsService: VariationsService,
    private dialog: MatDialog,
    private error: ErrorSanitazerService,
    private snackbar: SnackbarService
  ) {}

  loading = false;

  variations: IVariation[] = [];
  columns = ['name', 'price', 'product', 'actions'];

  ngOnInit(): void {
    this.loading = true;
    this.getVariations();
  }

  getVariations(name = '') {
    this.variationsService.getVariations(name).subscribe({
      next: (variations) => {
        this.variations = variations;
        this.loading = false;
      },
      error: (err: IReqError) => {
        this.error.reqErrorSanitazer(err);
        this.loading = false;
      },
    });
  }

  detailVariation(variations: IVariation | null) {
    const dialogRef = this.dialog.open(DetailVariationComponent, {
      data: { ...variations },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (result.id) {
        this.updateVariation(result);
        return;
      }
      this.createVariation(result);
    });
  }

  updateVariation(variations: IVariation) {
    this.loading = true;
    this.variationsService.updateVariation(variations).subscribe({
      next: () => {
        this.getVariations();
        this.snackbar.success('Variação editada com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  createVariation(variation: IVariation) {
    this.loading = true;
    this.variationsService.createVariation(variation).subscribe({
      next: () => {
        this.getVariations();
        this.snackbar.success('Variação criada com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  deleteVariation(variation: IVariation) {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      data: {
        title: `Deletar ${variation.name}?`,
        message:
          'Isso inclui todos os tipos, variações e imagens associadas a esse produto. Essa ação não pode ser desfeita!',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.loading = true;
      this.variationsService.deleteVariation(variation.id).subscribe({
        next: () => {
          this.getVariations();
          this.snackbar.success('Variação deletada com sucesso!');
        },
        error: (err: IReqError) => {
          this.loading = false;
          this.error.reqErrorSanitazer(err);
        },
      });
    });
  }
}
