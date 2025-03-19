import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, pairwise } from 'rxjs';
import { map } from 'rxjs/operators';

import { isObjectsEqual } from '@core/utils';

import { DeliveryPointFacade } from '@delivery/delivery-point';

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
  resetDeliveryPoint: createEffect(
    (actions$ = inject(Actions), deliveryPointFacade = inject(DeliveryPointFacade)) => {
      return actions$.pipe(
        ofType(PickupPointActions.resetState),
        // delay(0),
        map(() => deliveryPointFacade.reset()),
      );
    },
    { functional: true, dispatch: false },
  ),
};
