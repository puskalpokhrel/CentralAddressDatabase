import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'address',
    loadChildren: () =>
      import('./address/address.routes').then(m => m.ADDRESS_ROUTES)
  },
  { path: '', redirectTo: 'address/province', pathMatch: 'full' }
];
