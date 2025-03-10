import { inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { OrderSummaryActions } from '@delivery/order-summary';
import { PickupPointActions } from '@delivery/pickup-point/store';
import { DeliveryActions } from '@delivery/store';

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
