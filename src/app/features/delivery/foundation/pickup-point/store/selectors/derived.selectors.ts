import { createSelector } from '@ngrx/store';
import { Office, PickupCity } from '@shared/types';

import { LIMITED_OFFICE } from '@delivery/constants';
import { BaseSelectors, DerivedSelectors } from '@delivery/foundation/pickup-point/store';
import { PickupPointTab, PickupPointTabType } from '@delivery/foundation/pickup-point/types';
import { ErrorStatus, LoadingStatus, SelectionStatus } from '@delivery/types';
import { PICKUP_POINT_TABS } from '@delivery/foundation/pickup-point/constants';

export const createDerivedSelectors = (baseSelectors: BaseSelectors): DerivedSelectors => {
  /**
   * Returns offices filtered by selected city ID.
   * Returns empty array if no city is selected.
   */
  const selectAvailableOffices = createSelector(
    [baseSelectors.selectOffices, baseSelectors.selectSelectedCity],
    (offices: Office[], selectedCity: PickupCity | null): Office[] => {
      if (!selectedCity) {
        return [];
      }
      return offices.filter((office) => office.office_id === selectedCity.office_id);
    },
  );

  const selectTabs = createSelector(
    selectAvailableOffices,
    (offices: Office[]): PickupPointTab[] => {
      if (!offices?.length) return [];

      return PICKUP_POINT_TABS.filter((tab) =>
        offices.some((office) => office[tab.apiValue] === '1'),
      ).sort((a, b) => (a.order || 0) - (b.order || 0));
    },
  );

  const selectActiveTab = createSelector(
    baseSelectors.selectActiveTabId,
    selectTabs,
    (
      activeTabId: PickupPointTabType | null,
      availableTabs: PickupPointTab[],
    ): PickupPointTab | null => {
      if (!activeTabId && !availableTabs.length) return null;

      return availableTabs.find((tab) => tab.id === activeTabId) || null;
    },
  );

  const selectIsOfficeLimited = createSelector(
    baseSelectors.selectSelectedOffice,
    (selectedOffice: Office | null): boolean => {
      if (!selectedOffice) return false;

      return [LIMITED_OFFICE.ALEUTSKAYA, LIMITED_OFFICE.GOGOLYA].includes(selectedOffice.home_id);
    },
  );

  const selectIsCourierTabActive = createSelector(
    baseSelectors.selectActiveTabId,
    (activeTabId: string | null): boolean => {
      if (!activeTabId) return false;

      return activeTabId === PickupPointTabType.COURIER;
    },
  );

  const selectIsRestricted = createSelector(
    selectIsOfficeLimited,
    selectIsCourierTabActive,
    (isOfficeLimited, isCourierTabActive): boolean => isOfficeLimited || isCourierTabActive,
  );

  return {
    selectAvailableOffices,
    selectIsOfficeLimited,
    selectTabs,
    selectActiveTab,
    selectIsCourierTabActive,
    selectIsRestricted,
    selectLoadingStatus: createSelector(
      baseSelectors.selectIsCitiesLoading,
      baseSelectors.selectIsOfficesLoading,
      (isCitiesLoading, isOfficesLoading): LoadingStatus => ({
        isCitiesLoading,
        isOfficesLoading,
        isAnyLoading: isCitiesLoading || isOfficesLoading,
      }),
    ),

    selectErrorStatus: createSelector(
      baseSelectors.selectCitiesError,
      baseSelectors.selectOfficesError,
      (citiesError, officesError): ErrorStatus => ({
        citiesError,
        officesError,
        hasAnyError: !!citiesError || !!officesError,
      }),
    ),

    selectSelectionStatus: createSelector(
      baseSelectors.selectSelectedCity,
      baseSelectors.selectSelectedOffice,
      (selectedCity, selectedOffice): SelectionStatus<PickupCity> => ({
        selectedCity,
        selectedOffice,
        isFullySelected: !!selectedCity && !!selectedOffice,
      }),
    ),
  };
};
