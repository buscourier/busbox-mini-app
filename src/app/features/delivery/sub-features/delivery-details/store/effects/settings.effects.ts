import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { switchMap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mapResponse } from '@ngrx/operators';

import { DeliveryService } from '@features/delivery/services';

import { DeliverySettings } from '../../types';

import { DeliveryDetailsActions } from '../actions';

export const settingsEffects = {
  loadOrderSettings: createEffect(
    (actions$ = inject(Actions), deliveryService = inject(DeliveryService)) => {
      return actions$.pipe(
        ofType(DeliveryDetailsActions.loadSettings),
        switchMap(({ pickupCityId, deliveryCityId }) =>
          deliveryService.loadSettings(pickupCityId, deliveryCityId).pipe(
            mapResponse({
              next: (settings: DeliverySettings) =>
                DeliveryDetailsActions.loadSettingsSuccess({ settings }),
              error: (error: HttpErrorResponse) => {
                console.error('Failed to load order item settings:', error);
                return DeliveryDetailsActions.loadSettingsFailure({ error: error.message });
              },
            }),
          ),
        ),
      );
    },
    { functional: true },
  ),
};
