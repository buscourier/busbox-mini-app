import { createActionGroup, emptyProps, props } from '@ngrx/store';

import type { ApiError } from '@shared/types';

export const DeliverySummaryActions = createActionGroup({
  source: 'DeliverySummary',
  events: {
    'Load Total Amount': emptyProps(),
    'Load Total Amount Success': props<{ totalAmount: number }>(),
    'Load Total Amount Failure': props<{ error: ApiError }>(),
    'Reset State': emptyProps(),
  },
});
