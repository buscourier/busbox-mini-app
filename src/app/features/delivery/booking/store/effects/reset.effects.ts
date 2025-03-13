import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import { BookingActions } from '@delivery/booking/store/actions';
import { DeliveryActions } from '@delivery/store/actions';

export const resetEffects = {
  resetOnGlobalReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryActions.resetDelivery),
        map(() => BookingActions.resetState()),
      );
    },
    { functional: true },
  ),
};
