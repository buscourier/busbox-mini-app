import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'delivery',
  },
  {
    path: 'delivery',
    loadChildren: () => import('./features/delivery/delivery.routes').then(m => m.deliveryRoutes),
  },
];
