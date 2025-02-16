import { StepNumber, StepView } from '../../types';

export interface BookingViewModel {
  currentStep: StepNumber;
  steps: StepView[];
  prevStep: StepNumber | null;
  nextStep: StepNumber | null;
  isLastStep: boolean;
  stepsValid: boolean;
}
