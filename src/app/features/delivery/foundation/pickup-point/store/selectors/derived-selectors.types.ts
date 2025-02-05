import { MemoizedSelector } from '@ngrx/store';
import { Office, PickupCity } from '@shared/types';
import { PickupPointTab } from '@delivery/foundation/pickup-point/types';
import { ErrorStatus, LoadingStatus, SelectionStatus } from '@delivery/types';

export interface DerivedSelectors {
  selectAvailableOffices: MemoizedSelector<object, Office[]>;
  selectIsOfficeLimited: MemoizedSelector<object, boolean>;
  selectTabs: MemoizedSelector<object, PickupPointTab[]>;
  selectActiveTab: MemoizedSelector<object, PickupPointTab | null>;
  selectIsCourierTabActive: MemoizedSelector<object, boolean>;
  selectIsRestricted: MemoizedSelector<object, boolean>;
  selectLoadingStatus: MemoizedSelector<object, LoadingStatus>;
  selectErrorStatus: MemoizedSelector<object, ErrorStatus>;
  selectSelectionStatus: MemoizedSelector<object, SelectionStatus<PickupCity>>;
}
