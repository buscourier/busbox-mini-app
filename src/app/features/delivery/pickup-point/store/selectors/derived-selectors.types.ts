import type { MemoizedSelector } from '@ngrx/store';

import type { FormValidationState, Office } from '@shared/types';

import type { PickupPointTab } from '@delivery/pickup-point/types';
import type { Courier, ErrorStatus } from '@delivery/types';

export interface DerivedSelectors {
  selectAvailableOffices: MemoizedSelector<object, Office[]>;
  selectIsOfficeLimited: MemoizedSelector<object, boolean>;
  selectTabs: MemoizedSelector<object, PickupPointTab[]>;
  selectActiveTab: MemoizedSelector<object, PickupPointTab | null>;
  selectIsCourierSelected: MemoizedSelector<object, boolean>;
  selectCourier: MemoizedSelector<object, Courier | null>;
  selectFormState: MemoizedSelector<object, FormValidationState>;
  selectIsPickupLimited: MemoizedSelector<object, boolean>;
  selectErrorStatus: MemoizedSelector<object, ErrorStatus>;
}
