import { Routes } from '@angular/router';

import { BookingComponent } from './booking.component';
import { stepGuard } from './guards/step.guard';
import { ApplicantComponent } from './pages/applicant/applicant.component';
import { RecipientComponent } from './pages/recipient/recipient.component';
import { ReviewComponent } from './pages/review/review.component';
import { SenderComponent } from './pages/sender/sender.component';

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
