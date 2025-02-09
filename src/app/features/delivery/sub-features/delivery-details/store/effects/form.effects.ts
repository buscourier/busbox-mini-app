import { inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { DeliveryPointActions } from '@features/delivery/delivery-point/store';
import { PickupPointActions } from '@features/delivery/pickup-point/store';

import { DeliveryDetailsActions } from '../actions';

export const formEffects = {
  resetFullForm: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.resetFormData, DeliveryPointActions.resetFormData),
        map(() => DeliveryDetailsActions.resetSettings()),
      );
    },
    { functional: true },
  ),
};
