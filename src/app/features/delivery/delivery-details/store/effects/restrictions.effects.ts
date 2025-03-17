import { inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeliveryPointFacade } from '@delivery/delivery-point';
import { PickupPointFacade } from '@delivery/pickup-point';

import { CargoRestrictionsService } from '../../services';

import { DeliveryDetailsActions } from '../actions';

export const restrictionsEffects = {
  setRestrictions: createEffect(
    (
      pickupPointFacade = inject(PickupPointFacade),
      deliveryPointFacade = inject(DeliveryPointFacade),
      restrictionsService = inject(CargoRestrictionsService),
    ) => {
      return combineLatest([
        deliveryPointFacade.getSelectedCity(),
        pickupPointFacade.isOfficeLimited(),
        deliveryPointFacade.isOfficeLimited(),
        pickupPointFacade.isCourierSelected(),
        deliveryPointFacade.isCourierSelected(),
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
