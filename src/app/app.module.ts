import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxMaskModule } from 'ngx-mask';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { InputNumberDirective } from './directives/input-number.directive';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { PageLoadingComponent } from './components/shared/page-loading/page-loading.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { IconDirective } from './directives/icon.directive';
import { InputFileDirective } from './directives/input-file.directive';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { TableSearchComponent } from './components/shared/table-search/table-search.component';
import { DetailProductComponent } from './pages/products/detail/detail.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DetailCategoryComponent } from './pages/categories/detail/detail.component';
import { VariationsComponent } from './pages/variations/variations.component';
import { DetailVariationComponent } from './pages/variations/detail/detail.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    PageLoadingComponent,
    InputFileDirective,
    IconDirective,
    PaginationComponent,
    NavbarComponent,
    InputNumberDirective,
    LoginComponent,
    ProductsComponent,
    TableSearchComponent,
    DetailProductComponent,
    AlertModalComponent,
    CategoriesComponent,
    DetailCategoryComponent,
    VariationsComponent,
    DetailVariationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTableModule,
    MatRippleModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
