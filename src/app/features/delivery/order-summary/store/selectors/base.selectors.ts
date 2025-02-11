import { createSelector, MemoizedSelector } from '@ngrx/store';

import { OrderSummaryState } from '../state';
import { BaseSelectors } from './base-selectors.types';

type OrderSummaryStateSelector = MemoizedSelector<object, OrderSummaryState>;

export const createBaseSelectors = (
  selectOrderSummaryState: OrderSummaryStateSelector,
): BaseSelectors => ({
  selectIsLoading: createSelector(selectOrderSummaryState, (state) => state.isLoading),
  selectIsLoaded: createSelector(selectOrderSummaryState, (state) => state.isLoaded),
  selectError: createSelector(selectOrderSummaryState, (state) => state.error),
  selectTotalAmount: createSelector(selectOrderSummaryState, (state) => state.totalAmount),
});
