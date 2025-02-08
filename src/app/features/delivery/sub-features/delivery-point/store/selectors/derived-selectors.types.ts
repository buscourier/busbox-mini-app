import { MemoizedSelector } from '@ngrx/store';

import { DeliveryCity, Office } from '@shared/types';

import { ErrorStatus, LoadingStatus, SelectionStatus } from '@features/delivery/types';

import { DeliveryPointTab } from '../../types';

export interface DerivedSelectors {
  selectAvailableOffices: MemoizedSelector<object, Office[]>;
  selectIsOfficeLimited: MemoizedSelector<object, boolean>;
  selectTabs: MemoizedSelector<object, DeliveryPointTab[]>;
  selectActiveTab: MemoizedSelector<object, DeliveryPointTab | null>;
  selectIsCourierTabActive: MemoizedSelector<object, boolean>;
  selectIsRestricted: MemoizedSelector<object, boolean>;
  selectLoadingStatus: MemoizedSelector<object, LoadingStatus>;
  selectErrorStatus: MemoizedSelector<object, ErrorStatus>;
  selectSelectionStatus: MemoizedSelector<object, SelectionStatus<DeliveryCity>>;
}
