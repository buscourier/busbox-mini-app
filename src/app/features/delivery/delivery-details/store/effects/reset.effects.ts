import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { resetDeliveryPointState } from '@delivery/delivery-point';

import { DeliveryDetailsActions } from '../actions';

export const resetEffects = {
  onDeliveryPointReset: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(resetDeliveryPointState),
        map(() => DeliveryDetailsActions.resetOptions()),
      );
    },
    { functional: true },
  ),
};
