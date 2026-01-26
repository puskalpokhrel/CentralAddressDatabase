import { Routes } from '@angular/router';

import { ProvinceComponent } from './province/province';
import { DistrictComponent } from './district/district';
import { MunicipalityComponent } from './municipality/municipality';
import { WardsComponent } from './wards/wards';
import { LocalAddressComponent } from './localaddress/localaddress';

export const ADDRESS_ROUTES: Routes = [
  { path: 'province', component: ProvinceComponent },
  { path: 'district', component: DistrictComponent },
  { path: 'municipality', component: MunicipalityComponent },
  { path: 'ward', component: WardsComponent },
  { path: 'localaddress', component: LocalAddressComponent }
];
