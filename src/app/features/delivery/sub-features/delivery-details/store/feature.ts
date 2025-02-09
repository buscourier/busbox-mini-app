import { createFeature } from '@ngrx/store';

import { deliveryDetailsReducer } from './reducer';
import { createBaseSelectors, createDerivedSelectors, createViewModelSelector } from './selectors';
import { adapter } from './state';

export const deliveryDetailsFeature = createFeature({
  name: 'deliveryDetails',
  reducer: deliveryDetailsReducer,
  extraSelectors: ({ selectDeliveryDetailsState }) => {
    const baseSelectors = createBaseSelectors(selectDeliveryDetailsState, adapter);
    const derivedSelectors = createDerivedSelectors(baseSelectors);
    const viewModelSelector = createViewModelSelector(baseSelectors, derivedSelectors);

    return {
      ...baseSelectors,
      ...derivedSelectors,
      ...viewModelSelector,
    };
  },
});
