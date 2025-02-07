import { Routes } from '@angular/router';

import { BookingComponent } from '@features/delivery/booking/booking.component';
import { applicantCompletedGuard } from '@features/delivery/booking/guards/applicant-completed.guard';
import { recipientCompletedGuard } from '@features/delivery/booking/guards/recipient-completed.guard';
import { senderCompletedGuard } from '@features/delivery/booking/guards/sender-completed.guard';
import { ApplicantComponent } from '@features/delivery/booking/steps/applicant/applicant.component';
import { RecipientComponent } from '@features/delivery/booking/steps/recipient/recipient.component';
import { ReviewComponent } from '@features/delivery/booking/steps/review/review.component';
import { SenderComponent } from '@features/delivery/booking/steps/sender/sender.component';

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
      },
      {
        path: 'sender',
        component: SenderComponent,
        canActivate: [applicantCompletedGuard],
        // resolve: {
        //   settings: SettingsResolver
        // }
      },
      {
        path: 'recipient',
        component: RecipientComponent,
        canActivate: [senderCompletedGuard],
        // resolve: {
        //   settings: SettingsResolver
        // }
      },
      {
        path: 'review',
        component: ReviewComponent,
        canActivate: [recipientCompletedGuard],
        // resolve: {
        //   settings: SettingsResolver
        // }
      },
    ],
  },
];
