import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Individual, StepNumber } from '../types';
import { ApplicantType } from '../types/applicant.types';
import { StoredBookingState } from '../types/storage.types';

export const BookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Navigate to step': props<{ stepNumber: StepNumber }>(),
    'Update step validation': props<{ step: StepNumber; isValid: boolean }>(),
    'Restore State': props<{ restoredState: StoredBookingState }>(),
    'Set Applicant Type': props<{ applicantType: ApplicantType }>(),
    'Update Individual Data': props<{ data: Individual }>(),
    'Skip Restore': emptyProps(),
    Init: emptyProps(),
    Reset: emptyProps(),
  },
});
