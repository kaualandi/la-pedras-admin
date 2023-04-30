import { IReqError } from '../models/utils';
import { SnackbarService } from './snackbar.service';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorSanitazerService {
  constructor(
    private snackbar: SnackbarService,
    private storage: StorageService
  ) {}

  reqErrorSanitazer(err: IReqError) {
    if (err?.error?.statusCode === 401) {
      this.storage.logout();
    }
    this.snackbar.error(
      err?.error?.message || 'Erro no servidor, tente novamente mais tarde.'
    );
  }
}
