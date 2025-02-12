import { Routes } from '@angular/router';

import { BookingComponent } from './booking.component';
import { stepGuard } from './guards/step.guard';
import { ApplicantComponent } from './steps/applicant/applicant.component';
import { RecipientComponent } from './steps/recipient/recipient.component';
import { ReviewComponent } from './steps/review/review.component';
import { SenderComponent } from './steps/sender/sender.component';

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
