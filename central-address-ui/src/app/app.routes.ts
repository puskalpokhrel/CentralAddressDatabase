import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'province',
    loadComponent: () =>
      import('./address/province/province').then(m => m.ProvinceComponent)
  },
  {
    path: 'district',
    loadComponent: () =>
      import('./address/district/district').then(m => m.DistrictComponent)
  },
  {
    path: 'municipality',
    loadComponent: () =>
      import('./address/municipality/municipality').then(m => m.MunicipalityComponent)
  },
  {
    path: 'wards',
    loadComponent: () =>
      import('./address/wards/wards').then(m => m.WardsComponent)
  },
  {
    path: 'localaddress',
    loadComponent: () =>
      import('./address/localaddress/localaddress').then(m => m.LocalAddressComponent)
  }
];
