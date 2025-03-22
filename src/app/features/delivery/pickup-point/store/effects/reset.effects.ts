import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, pairwise } from 'rxjs';
import { map } from 'rxjs/operators';

import { isObjectsEqual } from '@core/utils';

import { DeliveryActions } from '@delivery/store';

import { PickupPointActions } from '../actions';

export const resetEffects = {
  onDeliveryReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryActions.resetDelivery),
        map(() => PickupPointActions.resetState({ keepCity: false })),
      );
    },
    { functional: true },
  ),
  onCityChangeReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.selectCity),
        pairwise(),
        filter(([prev, next]) => !isObjectsEqual(prev, next)),
        map(([, next]) => next),
        map(({ city }) => PickupPointActions.resetState({ keepCity: true, city })),
      );
    },
    { functional: true },
  ),
};
