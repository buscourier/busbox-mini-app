import type { MemoizedSelector } from '@ngrx/store';

import type { FormValidationState, Office } from '@shared/types';

import type { DeliveryPointTab } from '@delivery/delivery-point/types';
import type { Courier, ErrorStatus } from '@delivery/types';

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
