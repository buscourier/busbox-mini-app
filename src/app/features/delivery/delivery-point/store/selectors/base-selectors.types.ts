import { MemoizedSelector } from '@ngrx/store';

import { ApiError, DeliveryCity, Office } from '@shared/types';
import { FormState } from '@shared/types/form.types';

import { CourierDetails } from '@features/delivery/types';

import { DeliveryPointTabType } from '../../types';

export interface BaseSelectors {
  /** Cities selector group */
  selectCities: MemoizedSelector<object, DeliveryCity[]>;
  selectIsCitiesLoading: MemoizedSelector<object, boolean>;
  selectCitiesError: MemoizedSelector<object, ApiError | null>;
  selectSelectedCity: MemoizedSelector<object, DeliveryCity | null>;

  /** Offices selector group */
  selectOffices: MemoizedSelector<object, Office[]>;
  selectIsOfficesLoading: MemoizedSelector<object, boolean>;
  selectOfficesError: MemoizedSelector<object, ApiError | null>;
  selectSelectedOffice: MemoizedSelector<object, Office | null>;

  /** Tabs selector group */
  selectActiveTabId: MemoizedSelector<object, DeliveryPointTabType | null>;

  selectCourierDetails: MemoizedSelector<object, CourierDetails | null>;
  selectBusPickup: MemoizedSelector<object, boolean>;
  selectForm: MemoizedSelector<object, FormState>;
}
