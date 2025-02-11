import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { StepNumber } from '../types';
import { StoredBookingState } from '../types/storage.types';

export const BookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Navigate to step': props<{ stepNumber: StepNumber }>(),
    'Set step valid': props<{ stepNumber: StepNumber; isValid: boolean }>(),
    'Restore State': props<{ restoredState: StoredBookingState }>(),
    'Skip Restore': emptyProps(),
    Init: emptyProps(),
    Reset: emptyProps(),
  },
});
