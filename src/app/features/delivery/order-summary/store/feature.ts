import { createFeature } from '@ngrx/store';

import { orderSummaryReducer } from './reducer';
import { createBaseSelectors, createViewModelSelector } from './selectors';

export const orderSummaryFeature = createFeature({
  name: 'orderSummary',
  reducer: orderSummaryReducer,
  extraSelectors: ({ selectOrderSummaryState }) => {
    const baseSelectors = createBaseSelectors(selectOrderSummaryState);
    const viewModelSelector = createViewModelSelector(baseSelectors);

    return {
      ...baseSelectors,
      ...viewModelSelector,
    };
  },
});
