import { inject } from '@angular/core';

import { filter, pairwise } from 'rxjs';
import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { isObjectsEqual } from '@core/utils';

import { DeliveryPointActions } from '@delivery/delivery-point/store';
import { OrderSummaryActions } from '@delivery/order-summary';
import { PickupPointActions } from '@delivery/pickup-point/store';

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
