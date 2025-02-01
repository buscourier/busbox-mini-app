import { BookingComponent } from './booking.component';
import { Routes } from '@angular/router';
import { ApplicantComponent } from './steps/applicant/applicant.component';
import { SenderComponent } from './steps/sender/sender.component';
import { RecipientComponent } from './steps/recipient/recipient.component';
import { SummaryComponent } from './steps/summary/summary.component';
import { applicantCompletedGuard } from './guards/applicant-completed.guard';
import { senderCompletedGuard } from './guards/sender-completed.guard';
import { recipientCompletedGuard } from './guards/recipient-completed.guard';

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
        path: 'summary',
        component: SummaryComponent,
        canActivate: [recipientCompletedGuard],
        // resolve: {
        //   settings: SettingsResolver
        // }
      },
    ],
  },
];
