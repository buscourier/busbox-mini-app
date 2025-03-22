import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, pairwise } from 'rxjs';
import { map } from 'rxjs/operators';

import { isObjectsEqual } from '@core/utils';

import { resetPickupPointState } from '@delivery/pickup-point';

import { DeliveryPointActions } from '../actions';

export const resetEffects = {
  onPickupPointReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(resetPickupPointState),
        // delay(0),
        map(() => DeliveryPointActions.resetState({ keepCity: false })),
      );
    },
    { functional: true },
  ),
  onCityChangeReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.selectCity),
        pairwise(),
        filter(([prev, next]) => !isObjectsEqual(prev, next)),
        map(([, next]) => next),
        map(({ city }) => DeliveryPointActions.resetState({ keepCity: true, city })),
      );
    },
    { functional: true },
  ),
};
