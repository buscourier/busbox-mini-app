import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, pairwise } from 'rxjs';
import { map } from 'rxjs/operators';

import { isObjectsEqual } from '@core/utils';

import { DeliveryDetailsFacade } from '@delivery/delivery-details';

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
  resetDeliveryOptions: createEffect(
    (actions$ = inject(Actions), deliveryDetailsFacade = inject(DeliveryDetailsFacade)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.resetState),
        map(() => deliveryDetailsFacade.resetOptions()),
      );
    },
    { functional: true, dispatch: false },
  ),
};
