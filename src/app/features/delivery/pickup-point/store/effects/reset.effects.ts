import { inject } from '@angular/core';

import { filter, pairwise } from 'rxjs';
import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { isObjectsEqual } from '@core/utils/object.utils';

import { DeliveryActions } from '../../../store/actions';

import { PickupPointActions } from '../actions';

export const resetEffects = {
  resetOnCityChange: createEffect(
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
  resetOnGlobalReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryActions.resetDelivery),
        map(() => PickupPointActions.resetState({ keepCity: false })),
      );
    },
    { functional: true },
  ),
};
