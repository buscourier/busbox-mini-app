import { inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { combineLatest, debounceTime } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEBOUNCE_TIME } from '@core/constants';

import { DeliveryPointFacade } from '@delivery/delivery-point';
import { PickupPointFacade } from '@delivery/pickup-point';

import { DeliveryDetailsActions } from '../actions';

export const citySelectionEffects = {
  loadOptionsOnCitiesSelected: createEffect(
    (
      pickupPointFacade = inject(PickupPointFacade),
      deliveryPointFacade = inject(DeliveryPointFacade),
    ) => {
      return combineLatest([
        pickupPointFacade.getSelectedCity(),
        deliveryPointFacade.getSelectedCity(),
      ]).pipe(
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        map(([pickupCity, deliveryCity]) => {
          if (pickupCity?.id && deliveryCity?.id) {
            return DeliveryDetailsActions.loadOptions({
              pickupCityId: pickupCity.id,
              deliveryCityId: deliveryCity.id,
            });
          }

          return DeliveryDetailsActions.skipLoadOptions();
        }),
      );
    },
    { functional: true },
  ),
};
