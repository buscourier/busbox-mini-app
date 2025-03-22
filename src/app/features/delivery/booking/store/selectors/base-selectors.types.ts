import type { MemoizedSelector } from '@ngrx/store';

import type { ApiError } from '@shared/types';

import type {
  Applicant,
  BookingResult,
  Departure,
  Destination,
  Review,
  Step,
  StepNumber,
  StepsData,
} from '../../types';

export interface BaseSelectors {
  selectCurrentStep: MemoizedSelector<object, StepNumber>;
  selectSteps: MemoizedSelector<object, Record<StepNumber, Step>>;
  selectMaxAvailableStep: MemoizedSelector<object, StepNumber>;
  selectStepsData: MemoizedSelector<object, StepsData>;
  selectApplicant: MemoizedSelector<object, Applicant | null>;
  selectDeparture: MemoizedSelector<object, Departure | null>;
  selectDestination: MemoizedSelector<object, Destination | null>;
  selectReview: MemoizedSelector<object, Review>;
  selectIsSubmitSuccessful: MemoizedSelector<object, boolean>;
  selectIsSubmitFailed: MemoizedSelector<object, boolean>;
  selectError: MemoizedSelector<object, ApiError | null>;
  selectBookingResult: MemoizedSelector<object, BookingResult | null>;
}
