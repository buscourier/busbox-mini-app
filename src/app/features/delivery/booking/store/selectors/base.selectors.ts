import { createSelector, MemoizedSelector } from '@ngrx/store';

import { BookingState } from '../state';
import { BaseSelectors } from './base-selectors.types';

type BookingStateSelector = MemoizedSelector<object, BookingState>;

export const createBaseSelectors = (selectBookingState: BookingStateSelector): BaseSelectors => ({
  selectCurrentStep: createSelector(selectBookingState, (state) => state.currentStep),
  selectSteps: createSelector(selectBookingState, (state) => state.steps),
  selectMaxAvailableStep: createSelector(selectBookingState, (state) => state.maxAvailableStep),
  selectStepsData: createSelector(selectBookingState, (state) => state.stepsData),
  selectApplicant: createSelector(selectBookingState, (state) => state.stepsData.applicant),
});
