import type { MemoizedSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';

import type { DeliverySummaryState } from '../state';

import type { BaseSelectors } from './base-selectors.types';

type DeliverySummaryStateSelector = MemoizedSelector<object, DeliverySummaryState>;

export const createBaseSelectors = (
  selectDeliverySummaryState: DeliverySummaryStateSelector,
): BaseSelectors => ({
  selectIsLoading: createSelector(selectDeliverySummaryState, (state) => state.isLoading),
  selectIsLoaded: createSelector(selectDeliverySummaryState, (state) => state.isLoaded),
  selectError: createSelector(selectDeliverySummaryState, (state) => state.error),
  selectTotalAmount: createSelector(selectDeliverySummaryState, (state) => state.totalAmount),
});
