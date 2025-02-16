import { inject } from '@angular/core';

import { debounceTime, switchMap, withLatestFrom } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';

import { DEBOUNCE_TIME } from '@core/constants';

import { deliveryDetailsFeature } from '@features/delivery/delivery-details/store/feature';
import { deliveryPointFeature } from '@features/delivery/delivery-point/store';
import { pickupPointFeature } from '@features/delivery/pickup-point/store';

import { BookingService } from '../../services/booking.service';

import { BookingActions } from '../actions';
import { bookingFeature } from '../feature';

export const bookingEffects = {
  submitOrder: createEffect(
    (
      actions$ = inject(Actions),
      store = inject(Store),
      bookingService = inject(BookingService),
    ) => {
      return actions$.pipe(
        ofType(BookingActions.submitOrder),
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        withLatestFrom(
          store.select(pickupPointFeature.selectSelectedCity),
          store.select(pickupPointFeature.selectCourier),
          store.select(deliveryPointFeature.selectSelectedCity),
          store.select(deliveryPointFeature.selectCourier),
          store.select(pickupPointFeature.selectDepartureDate),
          store.select(bookingFeature.selectDeparture),
          store.select(bookingFeature.selectDestination),
          store.select(deliveryDetailsFeature.selectAll),
        ),
        switchMap(
          ([
            ,
            pickupCity,
            pickupCourier,
            deliveryCity,
            deliveryCourier,
            departureDate,
            departure,
            destination,
            orders,
          ]) => {
            const order = orders[0];
            return bookingService
              .submitOrder({
                pickupCity,
                pickupCourier,
                deliveryCity,
                deliveryCourier,
                departureDate,
                departure,
                destination,
                order,
              })
              .pipe(
                mapResponse({
                  next: () => BookingActions.submitOrderSuccess(),
                  error: () => BookingActions.submitOrderFailure(),
                }),
              );
          },
        ),
      );
    },
    { functional: true },
  ),
};
