import { inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { DeliveryActions } from '../../../store/actions';

import { BookingActions } from '../actions';

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
