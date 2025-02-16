import { MemoizedSelector } from '@ngrx/store';

import { Step, StepNumber, StepView } from '../../types';

export interface DerivedSelectors {
  selectStepsView: MemoizedSelector<object, StepView[]>;
  selectStepPath: (step: StepNumber) => MemoizedSelector<object, string>;
  selectPrevStep: MemoizedSelector<object, StepNumber | null>;
  selectNextStep: MemoizedSelector<object, StepNumber | null>;
  selectCanAccessStep: (step: StepNumber) => MemoizedSelector<object, boolean>;
  selectIsLastStep: MemoizedSelector<object, boolean>;
  selectCurrentStepData: MemoizedSelector<object, Step>;
  selectStepsValid: MemoizedSelector<object, boolean>;
}
