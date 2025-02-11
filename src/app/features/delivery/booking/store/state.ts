import { Step, StepNumber } from '../types';

export interface BookingState {
  currentStep: StepNumber;
  maxAvailableStep: StepNumber;
  steps: Record<StepNumber, Step>;
}
