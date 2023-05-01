import { AuthService } from './../../services/auth.service';
import { MatDrawer } from '@angular/material/sidenav';
import { StorageService } from './../../services/storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorSanitazerService } from 'src/app/services/error-sanitazer.service';
import { IReqError } from 'src/app/models/utils';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private error: ErrorSanitazerService
  ) {}

  loading = false;

  navbarHidden = true;

  user: IUser = {} as IUser;

  ngOnInit(): void {
    this.getMe();

    this.storage.watchUser().subscribe({
      next: () => {
        this.getMe();
      },
    });
  }

  ngOnDestroy(): void {
    this.storage.unwatchUser();
  }

  getMe() {
    this.loading = true;
    this.authService.me().subscribe({
      next: (res) => {
        this.storage.myself = res;
        this.user = res;
        this.loading = false;
      },
      error: (err: IReqError) => {
        this.error.reqErrorSanitazer(err);
        this.loading = false;
      },
    });
  }

  async navItemClick(drawer: MatDrawer) {
    if (window.innerWidth <= 768) {
      await drawer.toggle();
    }
  }

  logout() {
    this.storage.logout();
  }
}
