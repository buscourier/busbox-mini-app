import { MemoizedSelector } from '@ngrx/store';

import { Office, PickupCity } from '@shared/types';
import { FormControlValidationStatus, FormValidationState } from '@shared/types/form.types';

import { Courier, ErrorStatus, LoadingStatus, SelectionStatus } from '@features/delivery/types';

import { PickupPointTab } from '../../types';

export interface DerivedSelectors {
  selectAvailableOffices: MemoizedSelector<object, Office[]>;
  selectIsOfficeLimited: MemoizedSelector<object, boolean>;
  selectTabs: MemoizedSelector<object, PickupPointTab[]>;
  selectActiveTab: MemoizedSelector<object, PickupPointTab | null>;
  selectIsCourierTabActive: MemoizedSelector<object, boolean>;
  selectCourier: MemoizedSelector<object, Courier | null>;
  selectIsRestricted: MemoizedSelector<object, boolean>;
  selectLoadingStatus: MemoizedSelector<object, LoadingStatus>;
  selectErrorStatus: MemoizedSelector<object, ErrorStatus>;
  selectSelectionStatus: MemoizedSelector<object, SelectionStatus<PickupCity>>;
  selectFormControlStatus?: MemoizedSelector<object, FormControlValidationStatus>;
  selectFormState: MemoizedSelector<object, FormValidationState>;
}
