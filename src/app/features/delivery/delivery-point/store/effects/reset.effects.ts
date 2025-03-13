import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import { filter, pairwise } from 'rxjs';

import { isObjectsEqual } from '@core/utils';

import { DeliveryDetailsActions } from '@delivery/delivery-details/store/actions';
import { DeliveryPointActions } from '@delivery/delivery-point/store/actions';

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
  resetDeliveryOptions: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.resetState),
        map(() => DeliveryDetailsActions.resetOptions()),
      );
    },
    { functional: true },
  ),
};
