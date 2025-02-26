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
    baseSelectors.selectSettingsLoading,
    baseSelectors.selectSettingsLoaded,
    baseSelectors.selectSettingsError,
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
      settingsLoading,
      settingsLoaded,
      settingsError,
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
      settingsLoading,
      settingsLoaded,
      settingsError,
      settings,
      error,
    }),
  ),
});
