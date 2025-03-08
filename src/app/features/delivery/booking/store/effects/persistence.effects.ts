import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { debounceTime, filter, tap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { DEBOUNCE_TIME } from '@core/constants';
import { PersistenceService } from '@core/services';

import type { DeliveryStorageKey, DeliveryStorageSchema } from '@features/delivery/types';

import type { StoredBookingState } from '../../types';

import { BookingActions } from '../actions';
import { bookingFeature } from '../feature';

export const persistenceEffects = {
  saveState: createEffect(
    (
      actions$ = inject(Actions),
      store = inject(Store),
      persistenceService = inject(PersistenceService),
    ) => {
      return actions$.pipe(
        ofType(
          BookingActions.navigateToStep,
          BookingActions.resetState,
          BookingActions.updateIndividualData,
          BookingActions.updateStepValidation,
          BookingActions.setApplicantType,
        ),
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        withLatestFrom(
          store.select(bookingFeature.selectCurrentStep),
          store.select(bookingFeature.selectMaxAvailableStep),
          store.select(bookingFeature.selectStepsData),
          store.select(bookingFeature.selectSteps),
          store.select(bookingFeature.selectCurrentStepData),
        ),
        filter(([, , , , , currentStepData]) => currentStepData.isValid),
        map(([, currentStep, maxAvailableStep, stepsData, steps]) => ({
          currentStep,
          maxAvailableStep,
          stepsData,
          steps,
        })),
        tap((state) => {
          persistenceService.save<DeliveryStorageKey, DeliveryStorageSchema>('booking', state);
        }),
      );
    },
    { functional: true, dispatch: false },
  ),
  removeState: createEffect(
    (actions$ = inject(Actions), persistenceService = inject(PersistenceService)) => {
      return actions$.pipe(
        ofType(BookingActions.resetState),
        tap(() => persistenceService.remove<DeliveryStorageKey, DeliveryStorageSchema>('booking')),
      );
    },
    { functional: true, dispatch: false },
  ),
  restoreState: createEffect(
    (
      actions$ = inject(Actions),
      store = inject(Store),
      persistenceService = inject(PersistenceService),
      router = inject(Router),
    ) => {
      return actions$.pipe(
        ofType(BookingActions.init),
        withLatestFrom(store.select(bookingFeature.selectSteps)),
        map(([, steps]) => {
          const restoredState = persistenceService.load<DeliveryStorageKey, DeliveryStorageSchema>(
            'booking',
          ) as StoredBookingState;

          if (!restoredState) {
            return BookingActions.skipRestore();
          }

          router.navigate([`/delivery/booking/${steps[restoredState.currentStep].path}`]);

          return BookingActions.restoreState({ restoredState });
        }),
      );
    },
    { functional: true },
  ),
};
