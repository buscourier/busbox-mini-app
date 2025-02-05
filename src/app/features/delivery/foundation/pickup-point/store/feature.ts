import { createFeature } from '@ngrx/store';

import { pickupPointReducer } from '@delivery/foundation/pickup-point/store/reducer';
import {
  createBaseSelectors,
  createDerivedSelectors,
  createViewModelSelector,
} from '@delivery/foundation/pickup-point/store/selectors';

export const pickupPointFeature = createFeature({
  name: 'pickupPoint',
  reducer: pickupPointReducer,
  extraSelectors: ({ selectPickupPointState }) => {
    const baseSelectors = createBaseSelectors(selectPickupPointState);
    const derivedSelectors = createDerivedSelectors(baseSelectors);
    const viewModelSelector = createViewModelSelector(baseSelectors, derivedSelectors);

    return {
      ...baseSelectors,
      ...derivedSelectors,
      ...viewModelSelector,
    };
  },
});
