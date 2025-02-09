import { MemoizedSelector } from '@ngrx/store';

import { ApiError } from '@shared/types';

export interface BaseSelectors {
  selectIsLoading: MemoizedSelector<object, boolean>;
  selectIsLoaded: MemoizedSelector<object, boolean>;
  selectError: MemoizedSelector<object, ApiError | null>;
  selectTotalAmount: MemoizedSelector<object, number>;
}
