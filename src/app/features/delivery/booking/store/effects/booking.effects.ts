import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';

import { debounceTime, delay, switchMap, tap, withLatestFrom } from 'rxjs';

import { DEBOUNCE_TIME } from '@core/constants';

import type { ApiError } from '@shared/types';

import { BookingService } from '@delivery/booking/services';
import { BookingActions, bookingFeature } from '@delivery/booking/store';
import { deliveryDetailsFeature } from '@delivery/delivery-details/store';
import { deliveryPointFeature } from '@delivery/delivery-point/store';
import { pickupPointFeature } from '@delivery/pickup-point/store';
import { DeliveryActions } from '@delivery/store';

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
          store.select(pickupPointFeature.selectSelectedOffice),
          store.select(pickupPointFeature.selectCourier),
          store.select(deliveryPointFeature.selectSelectedCity),
          store.select(deliveryPointFeature.selectSelectedOffice),
          store.select(deliveryPointFeature.selectCourier),
          store.select(deliveryPointFeature.selectBusPickup),
          store.select(pickupPointFeature.selectDepartureDate),
          store.select(bookingFeature.selectDeparture),
          store.select(bookingFeature.selectDestination),
          store.select(bookingFeature.selectReview),
          store.select(deliveryDetailsFeature.selectAll),
        ),
        switchMap(
          ([
            ,
            pickupCity,
            pickupOffice,
            pickupCourier,
            deliveryCity,
            deliveryOffice,
            deliveryCourier,
            busPickup,
            departureDate,
            departure,
            destination,
            review,
            orders,
          ]) => {
            const order = orders[0];

            const pickupNote = pickupCourier
              ? ``
              : `Место отправления: ${pickupCity?.name}, ${pickupOffice?.address}`;

            const deliveryNote = pickupCourier
              ? ``
              : busPickup
                ? `Место получения: ${deliveryCity?.name}, забрать с автобуса.`
                : `Место получения: ${deliveryCity?.name}, ${deliveryOffice?.address}`;

            const note = [review.comment, pickupNote, deliveryNote].join('. ');

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
                note,
              })
              .pipe(
                mapResponse({
                  next: (bookingResult) => BookingActions.submitOrderSuccess({ bookingResult }),
                  error: (error: ApiError) => BookingActions.submitOrderFailure({ error }),
                }),
              );
          },
        ),
      );
    },
    { functional: true },
  ),
  goToSuccess: createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(BookingActions.submitOrderSuccess),
        tap(() => router.navigate(['/delivery/booking/success'])),
      );
    },
    { functional: true, dispatch: false },
  ),

  resetOnSuccess: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(BookingActions.submitOrderSuccess),
        delay(0),
        map(() => DeliveryActions.resetDelivery()),
      );
    },
    { functional: true },
  ),
  goToFailure: createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
      return actions$.pipe(
        ofType(BookingActions.submitOrderFailure),
        tap(() => router.navigate(['/delivery/booking/failure'])),
      );
    },
    { functional: true, dispatch: false },
  ),
};
