import { createSelector } from '@ngrx/store';

import { BaseSelectors } from './base-selectors.types';
import { DerivedSelectors } from './derived-selectors.types';
import { PickupPointViewModel } from './view-model.types';

export const createViewModelSelector = (
  baseSelectors: BaseSelectors,
  derivedSelectors: DerivedSelectors,
) => ({
  selectViewModel: createSelector(
    baseSelectors.selectCities,
    derivedSelectors.selectAvailableOffices,
    derivedSelectors.selectTabs,
    derivedSelectors.selectActiveTab,
    derivedSelectors.selectSelectionStatus,
    baseSelectors.selectCourierDetails,
    baseSelectors.selectDepartureDate,
    derivedSelectors.selectLoadingStatus,
    derivedSelectors.selectErrorStatus,
    baseSelectors.selectFormState,
    (
      cities,
      offices,
      tabs,
      activeTab,
      selectionStatus,
      courierDetails,
      departureDate,
      loadingStatus,
      errorStatus,
      formState,
    ): PickupPointViewModel => ({
      cities,
      offices,
      tabs,
      activeTab,
      selectionStatus,
      courierDetails,
      departureDate,
      loadingStatus,
      errorStatus,
      formState,
    }),
  ),
});
