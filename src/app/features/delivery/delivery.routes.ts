import { Routes } from '@angular/router';

import { CalculatorComponent } from './calculator/calculator.component';
import { DeliveryComponent } from './delivery.component';

export const deliveryRoutes: Routes = [
  {
    path: '',
    component: DeliveryComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'calculator',
      },
      {
        path: 'calculator',
        component: CalculatorComponent,
      },
      {
        path: 'booking',
        loadChildren: () => import('./booking/booking.routes').then((m) => m.bookingRoutes),
      },
    ],
  },
];
