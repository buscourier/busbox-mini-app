import { inject } from '@angular/core';

import { switchMap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mapResponse } from '@ngrx/operators';

import { ApiError } from '@shared/types';

import { DeliveryService } from '@features/delivery/services';

import { DeliveryOptions } from '../../types';

import { DeliveryDetailsActions } from '../actions';

export const optionsEffects = {
  loadOptions: createEffect(
    (actions$ = inject(Actions), deliveryService = inject(DeliveryService)) => {
      return actions$.pipe(
        ofType(DeliveryDetailsActions.loadOptions),
        switchMap(({ pickupCityId, deliveryCityId }) =>
          deliveryService.loadOptions(pickupCityId, deliveryCityId).pipe(
            mapResponse({
              next: (options: DeliveryOptions) =>
                DeliveryDetailsActions.loadOptionsSuccess({ options }),
              error: (error: ApiError) => {
                console.error('Failed to load order item options:', error);
                return DeliveryDetailsActions.loadOptionsFailure({ error });
              },
            }),
          ),
        ),
      );
    },
    { functional: true },
  ),
};
