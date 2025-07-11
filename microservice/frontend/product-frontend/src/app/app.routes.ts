import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
];
