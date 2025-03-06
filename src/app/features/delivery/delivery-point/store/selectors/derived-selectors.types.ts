import { MemoizedSelector } from '@ngrx/store';

import { FormValidationState, Office } from '@shared/types';

import { Courier, ErrorStatus } from '@features/delivery/types';

import { DeliveryPointTab } from '../../types';

export interface DerivedSelectors {
  selectAvailableOffices: MemoizedSelector<object, Office[]>;
  selectIsOfficeLimited: MemoizedSelector<object, boolean>;
  selectTabs: MemoizedSelector<object, DeliveryPointTab[]>;
  selectActiveTab: MemoizedSelector<object, DeliveryPointTab | null>;
  selectIsCourierSelected: MemoizedSelector<object, boolean>;
  selectCourier: MemoizedSelector<object, Courier | null>;
  selectFormState: MemoizedSelector<object, FormValidationState>;
  selectErrorStatus: MemoizedSelector<object, ErrorStatus>;
  selectIsDeliveryLimited: MemoizedSelector<object, boolean>;
}
