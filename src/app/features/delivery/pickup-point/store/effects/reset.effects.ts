import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import { filter, pairwise } from 'rxjs';

import { isObjectsEqual } from '@core/utils';

import { DeliveryPointActions } from '@delivery/delivery-point/store/actions';
import { OrderSummaryActions } from '@delivery/order-summary/store/actions';
import { PickupPointActions } from '@delivery/pickup-point/store/actions';

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
  resetDeliveryPoint: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.resetState),
        // delay(0),
        map(() => DeliveryPointActions.resetState({ keepCity: false })),
      );
    },
    { functional: true },
  ),
  resetOrderSummary: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.resetState),
        map(() => OrderSummaryActions.resetState()),
      );
    },
    { functional: true },
  ),
};
