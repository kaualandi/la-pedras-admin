import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/models/user';
import { IReqError } from 'src/app/models/utils';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { DetailUserComponent } from './detail/detail.component';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private error: ErrorSanitazerService,
    private snackbar: SnackbarService,
    private storage: StorageService
  ) {}

  loading = false;

  myself = this.storage.myself;

  users: IUser[] = [];
  columns = ['name', 'email', 'is_admin', 'actions'];

  ngOnInit(): void {
    this.loading = true;
    this.getUsers();
  }

  getUsers(name = '') {
    this.usersService.getUsers(name).subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err: IReqError) => {
        this.error.reqErrorSanitazer(err);
        this.loading = false;
      },
    });
  }

  detailUser(users: IUser | null) {
    const dialogRef = this.dialog.open(DetailUserComponent, {
      data: { ...users },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (result.id) {
        this.updateUser(result);
        return;
      }
      this.createUser(result);
    });
  }

  updateUser(user: IUser) {
    this.loading = true;
    this.usersService.updateUser(user).subscribe({
      next: () => {
        this.getUsers();
        this.snackbar.success('Usuário editado com sucesso!');
        if (user.id === this.myself.id) {
          this.storage.changeUser();
        }
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  createUser(user: IUser) {
    this.loading = true;
    this.usersService.createUser(user).subscribe({
      next: () => {
        this.getUsers();
        this.snackbar.success('Usuário criado com sucesso!');
      },
      error: (err: IReqError) => {
        this.loading = false;
        this.error.reqErrorSanitazer(err);
      },
    });
  }

  deleteUser(user: IUser) {
    if (user.id === this.myself.id) {
      this.snackbar.error('Excluir a si mesmo?! Impossível!');
      return;
    }

    const dialogRef = this.dialog.open(AlertModalComponent, {
      data: {
        title: `Deletar ${user.name}?`,
        message: 'Essa ação não pode ser desfeita!',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.loading = true;
      this.usersService.deleteUser(user.id).subscribe({
        next: () => {
          this.getUsers();
          this.snackbar.success('Usuário deletado com sucesso!');
        },
        error: (err: IReqError) => {
          this.loading = false;
          this.error.reqErrorSanitazer(err);
        },
      });
    });
  }
}
