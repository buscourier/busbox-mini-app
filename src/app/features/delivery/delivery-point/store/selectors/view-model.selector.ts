import { createSelector } from '@ngrx/store';

import { BaseSelectors } from './base-selectors.types';
import { DerivedSelectors } from './derived-selectors.types';
import { DeliveryPointViewModel } from './view-model.types';

export const createViewModelSelector = (
  baseSelectors: BaseSelectors,
  derivedSelectors: DerivedSelectors,
) => ({
  selectViewModel: createSelector(
    baseSelectors.selectCities,
    derivedSelectors.selectAvailableOffices,
    baseSelectors.selectCourierDetails,
    baseSelectors.selectBusPickup,
    derivedSelectors.selectTabs,
    derivedSelectors.selectActiveTab,
    derivedSelectors.selectSelectionStatus,
    derivedSelectors.selectLoadingStatus,
    derivedSelectors.selectErrorStatus,
    derivedSelectors.selectFormState,
    (
      cities,
      offices,
      courierDetails,
      busPickup,
      tabs,
      activeTab,
      selectionStatus,
      loadingStatus,
      errorStatus,
      formState,
    ): DeliveryPointViewModel => ({
      cities,
      offices,
      courierDetails,
      busPickup,
      tabs,
      activeTab,
      selectionStatus,
      loadingStatus,
      errorStatus,
      formState,
    }),
  ),
});
