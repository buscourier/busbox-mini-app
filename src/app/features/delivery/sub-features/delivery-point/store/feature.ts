import { createFeature } from '@ngrx/store';

import { deliveryPointReducer } from './reducer';
import { createBaseSelectors, createDerivedSelectors, createViewModelSelector } from './selectors';

export const deliveryPointFeature = createFeature({
  name: 'deliveryPoint',
  reducer: deliveryPointReducer,
  extraSelectors: ({ selectDeliveryPointState }) => {
    const baseSelectors = createBaseSelectors(selectDeliveryPointState);
    const derivedSelectors = createDerivedSelectors(baseSelectors);
    const viewModelSelector = createViewModelSelector(baseSelectors, derivedSelectors);

    return {
      ...baseSelectors,
      ...derivedSelectors,
      ...viewModelSelector,
    };
  },
});
