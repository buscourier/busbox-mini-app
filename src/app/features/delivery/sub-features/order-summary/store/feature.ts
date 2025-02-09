import { createFeature } from '@ngrx/store';

import { orderSummaryReducer } from './reducer';
import { createBaseSelectors } from './selectors/base.selectors';

export const orderSummaryFeature = createFeature({
  name: 'orderSummary',
  reducer: orderSummaryReducer,
  extraSelectors: ({ selectOrderSummaryState }) => {
    const baseSelectors = createBaseSelectors(selectOrderSummaryState);

    return {
      ...baseSelectors,
    };
  },
});
