import { MemoizedSelector } from '@ngrx/store';

import { ApiError } from '@shared/types';

import { BookingResult } from '@features/delivery/types';

import { Step, StepNumber, StepsData } from '../../types';
import { Applicant } from '../../types/applicant.types';
import { Departure } from '../../types/departure.types';
import { Destination } from '../../types/destination.types';
import { Review } from '../../types/review.types';

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
