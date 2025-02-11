import { StepNumber, StepView } from '../../types';

export interface BookingViewModel {
  currentStep: StepNumber;
  steps: StepView[];
  prevStep: number | null;
  nextStep: number | null;
  isLastStep: boolean;
}
