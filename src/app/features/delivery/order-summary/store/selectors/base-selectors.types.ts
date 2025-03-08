import type { MemoizedSelector } from '@ngrx/store';

import type { ApiError } from '@shared/types';

export interface BaseSelectors {
  selectIsLoading: MemoizedSelector<object, boolean>;
  selectIsLoaded: MemoizedSelector<object, boolean>;
  selectError: MemoizedSelector<object, ApiError | null>;
  selectTotalAmount: MemoizedSelector<object, number>;
}
