import { createReducer, on } from '@ngrx/store';

import { DeliverySummaryActions } from './actions';
import type { DeliverySummaryState } from './state';

export const initialState: DeliverySummaryState = {
  isLoading: false,
  isLoaded: false,
  totalAmount: 0,
  error: null,
};

export const deliverySummaryReducer = createReducer(
  initialState,
  on(
    DeliverySummaryActions.loadTotalAmount,
    (state): DeliverySummaryState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    DeliverySummaryActions.loadTotalAmountSuccess,
    (state, { totalAmount }): DeliverySummaryState => ({
      ...state,
      totalAmount,
      isLoading: false,
      isLoaded: true,
    }),
  ),
  on(
    DeliverySummaryActions.loadTotalAmountFailure,
    (state, { error }): DeliverySummaryState => ({
      ...state,
      isLoading: false,
      isLoaded: false,
      error,
    }),
  ),
  on(DeliverySummaryActions.resetState, (): DeliverySummaryState => initialState),
);
