import { createSelector } from '@ngrx/store';

import { BaseSelectors } from './base-selectors.types';
import { DerivedSelectors } from './derived-selectors.types';
import { DeliveryPointViewModel } from './view-model.types';

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
      baseSelectors.selectBusPickup,
      derivedSelectors.selectFormState,
      derivedSelectors.selectErrorStatus,
      (
        cities,
        offices,
        tabs,
        activeTab,
        courierDetails,
        busPickup,
        form,
        error,
      ): DeliveryPointViewModel => ({
        cities,
        offices,
        tabs,
        activeTab,
        courierDetails,
        busPickup,
        form,
        error,
      }),
    ),
  };
};
