import { inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PickupPointActions } from '../../../pickup-point/store';

import { DeliveryPointActions } from '../actions';

export const formEffects = {
  resetForm: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.selectCity),
        map(({ city }) => DeliveryPointActions.resetFormData({ keepCity: true, city })),
      );
    },
    { functional: true },
  ),

  resetFullForm: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.resetFormData),
        map(() => DeliveryPointActions.resetFormData({ keepCity: false })),
      );
    },
    { functional: true },
  ),
};
