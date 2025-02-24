import { inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { DeliveryActions } from '../../../store/actions';

import { PickupPointActions } from '../actions';

export const resetEffects = {
  resetOnCityChange: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.selectCity),
        map(({ city }) => PickupPointActions.resetState({ keepCity: true, city })),
      );
    },
    { functional: true },
  ),
  resetOnGlobalReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryActions.resetDelivery),
        map(() => PickupPointActions.resetState({ keepCity: false })),
      );
    },
    { functional: true },
  ),
};
