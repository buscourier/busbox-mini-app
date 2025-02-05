import { createSelector } from '@ngrx/store';
import {
  BaseSelectors,
  DerivedSelectors,
  PickupPointViewModel,
} from '@delivery/foundation/pickup-point/store';

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
