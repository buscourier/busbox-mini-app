import { inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { OrderSummaryActions } from '@features/delivery/order-summary/store/actions';
import { PickupPointActions } from '@features/delivery/pickup-point/store';

import { DeliveryActions } from '../actions';

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
