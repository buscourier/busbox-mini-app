import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { PickupPointFacade } from '@delivery/pickup-point';

import { BookingActions } from '../actions';

export const initializationEffects = {
  onBookingInit: createEffect(
    (actions$ = inject(Actions), pickupPointFacade = inject(PickupPointFacade)) => {
      return actions$.pipe(
        ofType(BookingActions.init),
        map(() => pickupPointFacade.init()),
      );
    },
    { functional: true, dispatch: false },
  ),
};
