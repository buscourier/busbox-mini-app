import { inject } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { deliveryPointFeature } from '../../../delivery-point/store';
import { pickupPointFeature } from '../../../pickup-point/store';
import { CargoRestrictionsService } from '../../services';

import { DeliveryDetailsActions } from '../actions';

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
