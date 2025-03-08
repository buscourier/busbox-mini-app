import { createSelector } from '@ngrx/store';

import type { BaseSelectors } from './base-selectors.types';
import type { DerivedSelectors } from './derived-selectors.types';
import type { PickupPointViewModel } from './view-model.types';

export const createViewModelSelector = (
  baseSelectors: BaseSelectors,
  derivedSelectors: DerivedSelectors,
) => {
  const selectCitiesViewModel = createSelector(
    baseSelectors.selectCities,
    baseSelectors.selectIsCitiesLoading,
    baseSelectors.selectIsCitiesLoaded,
    baseSelectors.selectCitiesError,
    baseSelectors.selectSelectedCity,
    (items, isLoading, isLoaded, error, selected) => ({
      items,
      isLoading,
      isLoaded,
      error,
      selected,
    }),
  );

  const selectOfficesViewModel = createSelector(
    derivedSelectors.selectAvailableOffices,
    baseSelectors.selectIsOfficesLoading,
    baseSelectors.selectIsOfficesLoaded,
    baseSelectors.selectOfficesError,
    baseSelectors.selectSelectedOffice,
    (items, isLoading, isLoaded, error, selected) => ({
      items,
      isLoading,
      isLoaded,
      error,
      selected,
    }),
  );

  return {
    selectViewModel: createSelector(
      selectCitiesViewModel,
      selectOfficesViewModel,
      derivedSelectors.selectTabs,
      derivedSelectors.selectActiveTab,
      baseSelectors.selectCourierDetails,
      baseSelectors.selectDepartureDate,
      derivedSelectors.selectFormState,
      derivedSelectors.selectErrorStatus,
      (
        cities,
        offices,
        tabs,
        activeTab,
        courierDetails,
        departureDate,
        form,
        error,
      ): PickupPointViewModel => ({
        cities,
        offices,
        tabs,
        activeTab,
        courierDetails,
        departureDate,
        form,
        error,
      }),
    ),
  };
};
