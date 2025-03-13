import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import { OrderSummaryActions } from '@delivery/order-summary/store/actions';
import { PickupPointActions } from '@delivery/pickup-point/store/actions';
import { DeliveryActions } from '@delivery/store/actions';

export const resetEffects = {
  resetDelivery: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryActions.resetDelivery),
        map(() => PickupPointActions.resetState({ keepCity: false })),
      );
    },
    { functional: true },
  ),
  resetOrderSummary: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryActions.resetDelivery),
        map(() => OrderSummaryActions.resetState()),
      );
    },
    { functional: true },
  ),
};
