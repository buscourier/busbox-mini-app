import { MemoizedSelector } from '@ngrx/store';

import { Step, StepNumber, StepsData } from '../../types';
import { Applicant } from '../../types/applicant.types';

export interface BaseSelectors {
  selectCurrentStep: MemoizedSelector<object, StepNumber>;
  selectSteps: MemoizedSelector<object, Record<StepNumber, Step>>;
  selectMaxAvailableStep: MemoizedSelector<object, StepNumber>;
  selectStepsData: MemoizedSelector<object, StepsData>;
  selectApplicant: MemoizedSelector<object, Applicant | null>;
}
