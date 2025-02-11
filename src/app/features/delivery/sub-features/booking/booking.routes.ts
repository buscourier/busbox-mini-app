import { Routes } from '@angular/router';

import { BookingComponent } from '@features/delivery/booking/booking.component';
import { ApplicantComponent } from '@features/delivery/booking/steps/applicant/applicant.component';
import { RecipientComponent } from '@features/delivery/booking/steps/recipient/recipient.component';
import { ReviewComponent } from '@features/delivery/booking/steps/review/review.component';
import { SenderComponent } from '@features/delivery/booking/steps/sender/sender.component';

import { stepGuard } from './guards/step.guard';

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
        path: 'sender',
        component: SenderComponent,
        canActivate: [stepGuard],
      },
      {
        path: 'recipient',
        component: RecipientComponent,
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
