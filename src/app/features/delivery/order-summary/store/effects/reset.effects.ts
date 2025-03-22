import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { resetPickupPointState } from '@delivery/pickup-point';

import { OrderSummaryActions } from '../actions';

export const resetEffects = {
  onPickupPointReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(resetPickupPointState),
        map(() => OrderSummaryActions.resetState()),
      );
    },
    { functional: true },
  ),
};
