import { inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { DeliveryPointActions } from '../../../delivery-point/store';
import { PickupPointActions } from '../../../pickup-point/store';

import { DeliveryDetailsActions } from '../actions';

export const resetEffects = {
  resetOnPointsReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.resetState, DeliveryPointActions.resetState),
        map(() => DeliveryDetailsActions.resetSettings()),
      );
    },
    { functional: true },
  ),

  afterReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryDetailsActions.resetSettings),
        map(() => PickupPointActions.initState()),
      );
    },
    { functional: true },
  ),
};
