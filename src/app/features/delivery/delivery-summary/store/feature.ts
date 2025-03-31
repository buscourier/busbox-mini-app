import { createFeature } from '@ngrx/store';

import { deliverySummaryReducer } from './reducer';
import { createBaseSelectors, createViewModelSelector } from './selectors';

export const deliverySummaryFeature = createFeature({
  name: 'deliverySummary',
  reducer: deliverySummaryReducer,
  extraSelectors: ({ selectDeliverySummaryState }) => {
    const baseSelectors = createBaseSelectors(selectDeliverySummaryState);
    const viewModelSelector = createViewModelSelector(baseSelectors);

    return {
      ...baseSelectors,
      ...viewModelSelector,
    };
  },
});
