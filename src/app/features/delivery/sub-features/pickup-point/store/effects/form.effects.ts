import { inject } from '@angular/core';

import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PickupPointActions } from '../actions';

export const formEffects = {
  resetForm: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(PickupPointActions.selectCity),
        map(({ city }) => PickupPointActions.resetFormData({ keepCity: true, city })),
      );
    },
    { functional: true },
  ),
};
