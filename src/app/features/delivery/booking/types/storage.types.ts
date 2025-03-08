import type { Step, StepNumber, StepsData } from './step.types';

export interface StoredBookingState {
  currentStep: StepNumber;
  maxAvailableStep: StepNumber;
  steps: Record<StepNumber, Step>;
  stepsData: StepsData;
}
