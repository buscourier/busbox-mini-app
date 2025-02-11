import { MemoizedSelector } from '@ngrx/store';

import { Step, StepNumber } from '../../types';

export interface BaseSelectors {
  selectCurrentStep: MemoizedSelector<object, StepNumber>;
  selectSteps: MemoizedSelector<object, Record<StepNumber, Step>>;
  selectMaxAvailableStep: MemoizedSelector<object, StepNumber>;
}
