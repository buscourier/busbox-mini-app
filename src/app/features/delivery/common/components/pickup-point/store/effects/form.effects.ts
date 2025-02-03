import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { PickupPointActions } from '@features/delivery/common/components/pickup-point/store/actions';

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
