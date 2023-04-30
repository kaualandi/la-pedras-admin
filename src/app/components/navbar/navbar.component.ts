import { MatDrawer } from '@angular/material/sidenav';
import { StorageService } from './../../services/storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private storage: StorageService) {}

  loading = false;

  navbarHidden = true;

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
    // Requisição para pegar o usuário logado
    // if (error?.status === 401) {
    //   this.storageService.logout();
    // }
  }

  async navItemClick(drawer: MatDrawer) {
    if (window.innerWidth <= 768) {
      await drawer.toggle();
    }
  }

  logout() {
    console.log('');
  }
}
