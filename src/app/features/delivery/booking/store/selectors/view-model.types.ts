import type { StepNumber, StepView } from '@delivery/booking/types';

export interface BookingViewModel {
  currentStep: StepNumber;
  steps: StepView[];
  prevStep: StepNumber | null;
  nextStep: StepNumber | null;
  isLastStep: boolean;
  stepsValid: boolean;
}
