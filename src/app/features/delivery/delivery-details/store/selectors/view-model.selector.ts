import { createSelector } from '@ngrx/store';

import { BaseSelectors } from './base-selectors.types';
import { DerivedSelectors } from './derived-selectors.types';
import { DeliveryDetailsViewModel } from './view-model.types';

export const createViewModelSelector = (
  baseSelectors: BaseSelectors,
  derivedSelectors: DerivedSelectors,
) => ({
  selectViewModel: createSelector(
    derivedSelectors.selectEnhancedOrders,
    derivedSelectors.selectActiveOrder,
    derivedSelectors.selectIsActiveOrderValid,
    derivedSelectors.selectIsAllOrdersValid,
    derivedSelectors.selectCargoTypes,
    derivedSelectors.selectAdditionalServices,
    baseSelectors.selectRestrictions,
    baseSelectors.selectIsSettingsLoading,
    baseSelectors.selectIsSettingsLoaded,
    baseSelectors.selectSettings,
    baseSelectors.selectError,
    (
      enhancedOrders,
      activeOrder,
      isActiveOrderValid,
      isAllOrdersValid,
      cargoTypes,
      additionalServices,
      restrictions,
      isLoading,
      isLoaded,
      settings,
      error,
    ): DeliveryDetailsViewModel => ({
      enhancedOrders,
      activeOrder,
      isActiveOrderValid,
      isAllOrdersValid,
      cargoTypes,
      additionalServices,
      restrictions,
      isLoading,
      isLoaded,
      settings,
      error,
    }),
  ),
});
