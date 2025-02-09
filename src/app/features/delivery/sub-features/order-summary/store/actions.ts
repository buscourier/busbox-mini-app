import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ApiError } from '@shared/types';

export const OrderSummaryActions = createActionGroup({
  source: 'OrderSummary',
  events: {
    'Load Total Amount': emptyProps(),
    'Load Total Amount Success': props<{ totalAmount: number }>(),
    'Load Total Amount Failure': props<{ error: ApiError }>(),
  },
});
