import { createReducer, on } from '@ngrx/store';

import { OrderSummaryActions } from './actions';
import { OrderSummaryState } from './state';

export const initialState: OrderSummaryState = {
  isLoading: false,
  isLoaded: false,
  totalAmount: 0,
  error: null,
};

export const orderSummaryReducer = createReducer(
  initialState,
  on(
    OrderSummaryActions.loadTotalAmount,
    (state): OrderSummaryState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    OrderSummaryActions.loadTotalAmountSuccess,
    (state, { totalAmount }): OrderSummaryState => ({
      ...state,
      totalAmount,
      isLoading: false,
      isLoaded: true,
    }),
  ),
  on(
    OrderSummaryActions.loadTotalAmountFailure,
    (state, { error }): OrderSummaryState => ({
      ...state,
      isLoading: false,
      isLoaded: false,
      error,
    }),
  ),
);
