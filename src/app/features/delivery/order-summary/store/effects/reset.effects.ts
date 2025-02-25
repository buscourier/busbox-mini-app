import { inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { DeliveryPointActions } from '@features/delivery/delivery-point/store';
import { PickupPointActions } from '@features/delivery/pickup-point/store';

import { DeliveryActions } from '../../../store/actions';

import { OrderSummaryActions } from '../actions';

export const resetEffects = {
  resetOnGlobalReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(
          DeliveryActions.resetDelivery,
          PickupPointActions.resetState,
          DeliveryPointActions.resetState,
        ),
        map(() => OrderSummaryActions.resetState()),
      );
    },
    { functional: true },
  ),
};
