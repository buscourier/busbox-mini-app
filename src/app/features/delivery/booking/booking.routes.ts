import { Routes } from '@angular/router';

import { BookingComponent } from './booking.component';
import { stepGuard } from './guards/step.guard';
import { ApplicantComponent } from './steps/applicant/applicant.component';
import { DepartureComponent } from './steps/departure/departure.component';
import { DestinationComponent } from './steps/destination/destination.component';
import { ReviewComponent } from './steps/review/review.component';

export const bookingRoutes: Routes = [
  {
    path: '',
    component: BookingComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'applicant',
      },
      {
        path: 'applicant',
        component: ApplicantComponent,
        canActivate: [stepGuard],
      },
      {
        path: 'departure',
        component: DepartureComponent,
        canActivate: [stepGuard],
      },
      {
        path: 'destination',
        component: DestinationComponent,
        canActivate: [stepGuard],
      },
      {
        path: 'review',
        component: ReviewComponent,
        canActivate: [stepGuard],
      },
    ],
  },
];
