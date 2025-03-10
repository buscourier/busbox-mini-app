import { createSelector } from '@ngrx/store';

import type { Step, StepNumber } from '@delivery/booking/types';

import type { BaseSelectors } from './base-selectors.types';
import type { DerivedSelectors } from './derived-selectors.types';

export const createDerivedSelectors = (baseSelectors: BaseSelectors): DerivedSelectors => {
  return {
    selectStepsView: createSelector(
      baseSelectors.selectCurrentStep,
      baseSelectors.selectSteps,
      (currentStep, steps) =>
        Object.entries(steps).map(([key, value]) => ({
          ...value,
          isActive: currentStep === Number(key),
          isCompleted: Number(key) < currentStep && value.isValid,
        })),
    ),

    selectCurrentStepData: createSelector(
      baseSelectors.selectSteps,
      baseSelectors.selectCurrentStep,
      (steps, currentStep) => steps[currentStep],
    ),

    selectStepPath: (step: StepNumber) =>
      createSelector(baseSelectors.selectSteps, (steps) => steps[step].path),

    selectPrevStep: createSelector(baseSelectors.selectCurrentStep, (currentStep) =>
      currentStep > 1 ? ((currentStep - 1) as StepNumber) : null,
    ),

    selectNextStep: createSelector(
      baseSelectors.selectCurrentStep,
      baseSelectors.selectSteps,
      (currentStep, steps) =>
        steps[currentStep].isValid && currentStep < 4 ? ((currentStep + 1) as StepNumber) : null,
    ),

    selectCanAccessStep: (step: StepNumber) =>
      createSelector(
        baseSelectors.selectMaxAvailableStep,
        (maxAvailableStep) => step <= maxAvailableStep,
      ),

    selectIsLastStep: createSelector(
      baseSelectors.selectCurrentStep,
      (currentStep) => currentStep === 4,
    ),

    selectStepsValid: createSelector(
      baseSelectors.selectSteps,
      (steps: Record<StepNumber, Step>): boolean => {
        return Object.values(steps).every((step) => step.isValid);
      },
    ),
  };
};
