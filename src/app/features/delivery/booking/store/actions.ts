import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Individual, Sender, StepNumber } from '../types';
import { ApplicantType } from '../types/applicant.types';
import { Recipient } from '../types/recipient.types';
import { StoredBookingState } from '../types/storage.types';

export const BookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Navigate to step': props<{ stepNumber: StepNumber }>(),
    'Update step validation': props<{ step: StepNumber; isValid: boolean }>(),
    'Restore State': props<{ restoredState: StoredBookingState }>(),
    'Set Applicant Type': props<{ applicantType: ApplicantType }>(),
    'Update Individual Data': props<{ data: Individual }>(),
    'Update Sender Data': props<{ data: Sender }>(),
    'Update Recipient Data': props<{ data: Recipient }>(),
    'Update Review': props<
      Partial<{
        comment: string | null;
        rulesAccepted: boolean;
        processingAccepted: boolean;
      }>
    >(),
    'Skip Restore': emptyProps(),
    'Submit Order': emptyProps(),
    'Submit Order Success': emptyProps(),
    'Submit Order Failure': emptyProps(),
    Init: emptyProps(),
    Reset: emptyProps(),
  },
});
