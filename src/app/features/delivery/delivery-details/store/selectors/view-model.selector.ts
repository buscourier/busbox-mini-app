import { createSelector } from '@ngrx/store';

import { BaseSelectors } from './base-selectors.types';
import { DerivedSelectors } from './derived-selectors.types';
import { DeliveryDetailsViewModel } from './view-model.types';

export const createViewModelSelector = (
  baseSelectors: BaseSelectors,
  derivedSelectors: DerivedSelectors,
) => {
  const selectOptionsViewModel = createSelector(
    baseSelectors.selectIsOptionsLoading,
    baseSelectors.selectIsOptionsLoaded,
    baseSelectors.selectError,
    derivedSelectors.selectCargoTypes,
    derivedSelectors.selectAutoPartsOptions,
    derivedSelectors.selectOtherCargosOptions,
    derivedSelectors.selectAdditionalServicesOptions,
    derivedSelectors.selectPackagingOptions,
    (
      isLoading,
      isLoaded,
      error,
      cargoTypes,
      autoParts,
      otherCargos,
      additionalServices,
      packaging,
    ) => ({
      isLoading,
      isLoaded,
      error,
      cargoTypes,
      autoParts,
      otherCargos,
      additionalServices,
      packaging,
    }),
  );

  const selectOrdersViewModel = createSelector(
    derivedSelectors.selectEnhancedOrders,
    derivedSelectors.selectActiveOrder,
    derivedSelectors.selectIsActiveOrderValid,
    derivedSelectors.selectIsAllOrdersValid,
    (items, active, isActiveValid, isAllValid) => ({
      items,
      active,
      isActiveValid,
      isAllValid,
    }),
  );

  return {
    selectViewModel: createSelector(
      selectOrdersViewModel,
      selectOptionsViewModel,
      baseSelectors.selectRestrictions,
      (orders, options, restrictions): DeliveryDetailsViewModel => ({
        orders,
        options,
        restrictions,
      }),
    ),
  };
};
