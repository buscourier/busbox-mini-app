import { inject } from '@angular/core';

import { filter, pairwise } from 'rxjs';
import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { isObjectsEqual } from '@core/utils/object.utils';

import { PickupPointActions } from '../../../pickup-point/store';

import { DeliveryPointActions } from '../actions';

export const resetEffects = {
  resetOnCityChange: createEffect(
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

  resetOnPickupReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.resetState),
        map(() => DeliveryPointActions.resetState({ keepCity: false })),
      );
    },
    { functional: true },
  ),
};
