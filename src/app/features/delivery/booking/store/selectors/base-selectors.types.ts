import { MemoizedSelector } from '@ngrx/store';

import { Step, StepNumber, StepsData } from '../../types';
import { Applicant } from '../../types/applicant.types';
import { Departure } from '../../types/departure.types';

export interface BaseSelectors {
  selectCurrentStep: MemoizedSelector<object, StepNumber>;
  selectSteps: MemoizedSelector<object, Record<StepNumber, Step>>;
  selectMaxAvailableStep: MemoizedSelector<object, StepNumber>;
  selectStepsData: MemoizedSelector<object, StepsData>;
  selectApplicant: MemoizedSelector<object, Applicant | null>;
  selectDeparture: MemoizedSelector<object, Departure | null>;
}
