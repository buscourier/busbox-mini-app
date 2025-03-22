import type { ApiError } from '@shared/types';

import type { BookingResult, Step, StepNumber, StepsData } from '../types';

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
