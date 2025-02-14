import { createSelector } from '@ngrx/store';

import { DeliveryCity, Office } from '@shared/types';

import { LIMITED_OFFICE } from '@features/delivery/constants';
import { Courier, ErrorStatus, LoadingStatus, SelectionStatus } from '@features/delivery/types';

import { DELIVERY_POINT_TABS } from '../../constants';
import { DeliveryPointTab, DeliveryPointTabType } from '../../types';

import { BaseSelectors } from './base-selectors.types';
import { DerivedSelectors } from './derived-selectors.types';

export const createDerivedSelectors = (baseSelectors: BaseSelectors): DerivedSelectors => {
  /**
   * Returns offices filtered by selected city ID.
   * Returns empty array if no city is selected.
   */
  const selectAvailableOffices = createSelector(
    [baseSelectors.selectOffices, baseSelectors.selectSelectedCity],
    (offices: Office[], selectedCity: DeliveryCity | null): Office[] => {
      if (!selectedCity) {
        return [];
      }

      return offices.filter((office) => office.office_id === selectedCity.office_id);
    },
  );

  const selectOfficeTabs = createSelector(
    selectAvailableOffices,
    (offices: Office[]): DeliveryPointTab[] => {
      if (!offices?.length) return [];

      return DELIVERY_POINT_TABS.filter((tab) =>
        // Using type assertion because we know these apiValues exist in Office
        // Only 'get' and 'delivery' are checked here
        offices.some((office) => office[tab.apiValue as keyof Office] === '1'),
      ).sort((a, b) => (a.order || 0) - (b.order || 0));
    },
  );

  const selectNeedToMeetTab = createSelector(
    baseSelectors.selectSelectedCity,
    (selectedCity: DeliveryCity | null): DeliveryPointTab | null => {
      if (!selectedCity?.need_to_meet || selectedCity.need_to_meet !== '1') {
        return null;
      }

      return DELIVERY_POINT_TABS.find((tab) => tab.apiValue === 'need_to_meet') ?? null;
    },
  );

  const selectTabs = createSelector(
    selectOfficeTabs,
    selectNeedToMeetTab,
    (officeTabs, needToMeetTab): DeliveryPointTab[] => {
      if (needToMeetTab) {
        return [...officeTabs, needToMeetTab];
      }
      return officeTabs;
    },
  );

  const selectActiveTab = createSelector(
    baseSelectors.selectActiveTabId,
    selectTabs,
    (
      activeTabId: DeliveryPointTabType | null,
      availableTabs: DeliveryPointTab[],
    ): DeliveryPointTab | null => {
      if (!activeTabId || !availableTabs.length) return null;

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

      return activeTabId === DeliveryPointTabType.COURIER;
    },
  );

  const selectCourier = createSelector(
    selectIsCourierTabActive,
    baseSelectors.selectCourierDetails,
    (isCourierTabActive, courierDetails): Courier | null => {
      if (!isCourierTabActive || !courierDetails) return null;

      return {
        id: '2',
        details: courierDetails,
      };
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
      (selectedCity, selectedOffice): SelectionStatus<DeliveryCity> => ({
        selectedCity,
        selectedOffice,
        isFullySelected: !!selectedCity && !!selectedOffice,
      }),
    ),
  };
};
