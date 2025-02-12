import { StepNumber, StepsData } from './step.types';

export interface StoredBookingState {
  currentStep: StepNumber;
  maxAvailableStep: StepNumber;
  stepsData: StepsData;
}
