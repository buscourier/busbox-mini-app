import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'delivery',
  },
  {
    path: 'delivery',
    loadChildren: () => import('./features/delivery').then((m) => m.deliveryRoutes),
  },
];
