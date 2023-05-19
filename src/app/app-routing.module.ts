import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuthGuard } from './guards/auth.guard';
import { CategoriesComponent } from './pages/categories/categories.component';
import { VariationsComponent } from './pages/variations/variations.component';
import { TypesComponent } from './pages/types/types.component';
import { MeasuresComponent } from './pages/measures/measures.component';
import { UsersComponent } from './pages/users/users.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PdvComponent } from './pages/pdv/pdv.component';

const SPR = false;
const baseTitle = ' | AL Design Admin';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login' + baseTitle,
  },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    title: 'AL Design Admin',
    children: [
      {
        path: 'pdv',
        component: PdvComponent,
        title: 'PDV' + baseTitle,
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Produtos' + baseTitle,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categorias' + baseTitle,
      },
      {
        path: 'variations',
        component: VariationsComponent,
        title: 'Variações' + baseTitle,
      },
      {
        path: 'types',
        component: TypesComponent,
        title: 'Tipos' + baseTitle,
      },
      {
        path: 'measures',
        component: MeasuresComponent,
        title: 'Medidas' + baseTitle,
      },
      {
        path: 'users',
        component: UsersComponent,
        title: 'Usuários' + baseTitle,
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Configurações' + baseTitle,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: SPR ? 'enabled' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
