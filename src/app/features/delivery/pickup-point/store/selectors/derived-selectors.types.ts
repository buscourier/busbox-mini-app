import { MemoizedSelector } from '@ngrx/store';

import { FormValidationState, Office } from '@shared/types';

import { Courier, ErrorStatus } from '@features/delivery/types';

import { PickupPointTab } from '../../types';

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
