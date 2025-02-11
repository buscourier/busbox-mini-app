import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { StepNumber } from '../types';

export const BookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Navigate to step': props<{ stepNumber: StepNumber }>(),
    'Set step valid': props<{ stepNumber: StepNumber; isValid: boolean }>(),
    Reset: emptyProps(),
  },
});
