import { createSelector } from '@ngrx/store';

import { BaseSelectors } from './base-selectors.types';
import { DerivedSelectors } from './derived-selectors.types';
import { BookingViewModel } from './view-model.types';

export const createViewModelSelector = (
  baseSelectors: BaseSelectors,
  derivedSelectors: DerivedSelectors,
) => ({
  selectViewModel: createSelector(
    baseSelectors.selectCurrentStep,
    derivedSelectors.selectStepsView,
    derivedSelectors.selectPrevStep,
    derivedSelectors.selectNextStep,
    derivedSelectors.selectIsLastStep,
    (currentStep, steps, prevStep, nextStep, isLastStep): BookingViewModel => ({
      currentStep,
      steps,
      prevStep,
      nextStep,
      isLastStep,
    }),
  ),
});
