import { Step, StepNumber, StepsData } from '../types';

export interface BookingState {
  currentStep: StepNumber;
  maxAvailableStep: StepNumber;
  steps: Record<StepNumber, Step>;
  stepsData: StepsData;
}
