import type { MemoizedSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';

import type { BookingState } from '../state';

import type { BaseSelectors } from './base-selectors.types';

type BookingStateSelector = MemoizedSelector<object, BookingState>;

export const createBaseSelectors = (selectBookingState: BookingStateSelector): BaseSelectors => ({
  selectCurrentStep: createSelector(selectBookingState, (state) => state.currentStep),
  selectSteps: createSelector(selectBookingState, (state) => state.steps),
  selectMaxAvailableStep: createSelector(selectBookingState, (state) => state.maxAvailableStep),
  selectStepsData: createSelector(selectBookingState, (state) => state.stepsData),
  selectApplicant: createSelector(selectBookingState, (state) => state.stepsData.applicant),
  selectDeparture: createSelector(selectBookingState, (state) => state.stepsData.departure),
  selectDestination: createSelector(selectBookingState, (state) => state.stepsData.destination),
  selectReview: createSelector(selectBookingState, (state) => state.stepsData.review),
  selectIsSubmitSuccessful: createSelector(selectBookingState, (state) => state.isSubmitSuccessful),
  selectIsSubmitFailed: createSelector(selectBookingState, (state) => state.isSubmitFailed),
  selectError: createSelector(selectBookingState, (state) => state.error),
  selectBookingResult: createSelector(selectBookingState, (state) => state.bookingResult),
});
