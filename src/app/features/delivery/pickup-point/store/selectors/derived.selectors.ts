import { createSelector } from '@ngrx/store';

import { Office, PickupCity } from '@shared/types';

import { LIMITED_OFFICE } from '@features/delivery/constants';
import { Courier, ErrorStatus, LoadingStatus, SelectionStatus } from '@features/delivery/types';

import { PICKUP_POINT_TABS } from '../../constants';
import { PickupPointTab, PickupPointTabType } from '../../types';

import { BaseSelectors } from './base-selectors.types';
import { DerivedSelectors } from './derived-selectors.types';

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

  const selectCourier = createSelector(
    selectIsCourierTabActive,
    baseSelectors.selectCourierDetails,
    (isCourierTabActive, courierDetails): Courier | null => {
      if (!isCourierTabActive || !courierDetails) return null;

      return {
        id: '1',
        details: courierDetails,
      };
    },
  );

  return {
    selectAvailableOffices,
    selectIsOfficeLimited,
    selectTabs,
    selectActiveTab,
    selectIsCourierTabActive,
    selectCourier,
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
