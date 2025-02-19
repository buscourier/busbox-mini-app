import { Routes } from '@angular/router';

import { BookingComponent } from './booking.component';
import { FailureComponent } from './failure/failure.component';
import { bookingResultGuard } from './guards/booking-result.guard';
import { stepGuard } from './guards/step.guard';
import { ApplicantComponent } from './steps/applicant/applicant.component';
import { DepartureComponent } from './steps/departure/departure.component';
import { DestinationComponent } from './steps/destination/destination.component';
import { ReviewComponent } from './steps/review/review.component';
import { SuccessComponent } from './success/success.component';

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
      {
        path: 'success',
        component: SuccessComponent,
        canActivate: [bookingResultGuard],
      },
      {
        path: 'failure',
        component: FailureComponent,
        canActivate: [bookingResultGuard],
      },
    ],
  },
];
