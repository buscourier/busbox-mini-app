import { StepNumber } from './step.types';

export interface StoredBookingState {
  currentStep: StepNumber;
  maxAvailableStep: StepNumber;
}
