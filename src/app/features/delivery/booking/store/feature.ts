import { createFeature } from '@ngrx/store';

import { bookingReducer } from './reducer';
import { createBaseSelectors, createDerivedSelectors, createViewModelSelector } from './selectors';

export const bookingFeature = createFeature({
  name: 'booking',
  reducer: bookingReducer,
  extraSelectors: ({ selectBookingState }) => {
    const baseSelectors = createBaseSelectors(selectBookingState);
    const derivedSelectors = createDerivedSelectors(baseSelectors);
    const viewModelSelector = createViewModelSelector(baseSelectors, derivedSelectors);

    return {
      ...baseSelectors,
      ...derivedSelectors,
      ...viewModelSelector,
    };
  },
});
