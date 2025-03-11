import { inject } from '@angular/core';

import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';

import { combineLatest } from 'rxjs';

import { CargoRestrictionsService } from '@delivery/delivery-details/services';
import { DeliveryDetailsActions } from '@delivery/delivery-details/store';
import { deliveryPointFeature } from '@delivery/delivery-point';
import { pickupPointFeature } from '@delivery/pickup-point';

export const restrictionsEffects = {
  setRestrictions: createEffect(
    (store = inject(Store), restrictionsService = inject(CargoRestrictionsService)) => {
      return combineLatest([
        store.select(deliveryPointFeature.selectSelectedCity),
        store.select(pickupPointFeature.selectIsOfficeLimited),
        store.select(deliveryPointFeature.selectIsOfficeLimited),
        store.select(pickupPointFeature.selectIsCourierSelected),
        store.select(deliveryPointFeature.selectIsCourierSelected),
      ]).pipe(
        map(
          ([
            deliveryCity,
            isPickupOfficeLimited,
            isDeliveryOfficeLimited,
            isPickupCourierSelected,
            isDeliveryCourierSelected,
          ]) =>
            restrictionsService.getRestrictions({
              deliveryCity,
              isPickupOfficeLimited,
              isDeliveryOfficeLimited,
              isPickupCourierSelected,
              isDeliveryCourierSelected,
            }),
        ),
        map((restrictions) => DeliveryDetailsActions.setRestrictions({ restrictions })),
      );
    },
    { functional: true },
  ),
};
