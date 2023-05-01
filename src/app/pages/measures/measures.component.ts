import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IMeasure } from 'src/app/models/measure';
import { IReqError } from 'src/app/models/utils';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { MeasuresService } from 'src/app/services/measures.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DetailMeasureComponent } from './detail/detail.component';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.scss'],
})
export class MeasuresComponent implements OnInit {
  constructor(
    private measuresService: MeasuresService,
    private dialog: MatDialog,
    private error: ErrorSanitazerService,
    private snackbar: SnackbarService
  ) {}

  loading = false;

  measures: IMeasure[] = [];
  columns = ['name', 'abbreviation', 'actions'];

  ngOnInit(): void {
    this.loading = true;
    this.getMeasures();
  }

  getMeasures(name = '') {
    this.measuresService.getMeasures(name).subscribe({
      next: (measures) => {
        this.measures = measures;
        this.loading = false;
      },
      error: (err: IReqError) => {
        this.error.reqErrorSanitazer(err);
        this.loading = false;
      },
    });
  }

  detailMeasure(measures: IMeasure | null) {
    const dialogRef = this.dialog.open(DetailMeasureComponent, {
      data: { ...measures },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (result.id) {
        this.updateMeasure(result);
        return;
      }
      this.createMeasure(result);
    });
  }

  updateMeasure(measures: IMeasure) {
    this.loading = true;
    this.measuresService.updateMeasure(measures).subscribe({
      next: () => {
        this.getMeasures();
        this.snackbar.success('Medida editada com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  createMeasure(measure: IMeasure) {
    this.loading = true;
    this.measuresService.createMeasure(measure).subscribe({
      next: () => {
        this.getMeasures();
        this.snackbar.success('Medida criada com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  deleteMeasure(measure: IMeasure) {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      data: {
        title: `Deletar ${measure.name}?`,
        message: 'Essa ação não pode ser desfeita!',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.loading = true;
      this.measuresService.deleteMeasure(measure.id).subscribe({
        next: () => {
          this.getMeasures();
          this.snackbar.success('Medida deletada com sucesso!');
        },
        error: (err: IReqError) => {
          this.loading = false;
          this.error.reqErrorSanitazer(err);
        },
      });
    });
  }
}
