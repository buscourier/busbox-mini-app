import { MemoizedSelector } from '@ngrx/store';

import { StepNumber, StepView } from '../../types';

export interface DerivedSelectors {
  selectStepsView: MemoizedSelector<object, StepView[]>;
  selectStepPath: (step: StepNumber) => MemoizedSelector<object, string>;
  selectPrevStep: MemoizedSelector<object, number | null>;
  selectNextStep: MemoizedSelector<object, number | null>;
  selectCanAccessStep: (step: StepNumber) => MemoizedSelector<object, boolean>;
  selectIsLastStep: MemoizedSelector<object, boolean>;
}
