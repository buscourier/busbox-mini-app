import { ApiError } from '@shared/types';

import { BookingResult } from '@features/delivery/types';

import { Step, StepNumber, StepsData } from '../types';

export interface BookingState {
  currentStep: StepNumber;
  maxAvailableStep: StepNumber;
  steps: Record<StepNumber, Step>;
  stepsData: StepsData;
  isSubmitSuccessful: boolean;
  isSubmitFailed: boolean;
  error: ApiError | null;
  bookingResult: BookingResult | null;
}
