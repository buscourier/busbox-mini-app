import type { MemoizedSelector } from '@ngrx/store';

import type { ApiError, DeliveryCity, FormState, Office } from '@shared/types';

import type { DeliveryPointTabType } from '@delivery/delivery-point/types';
import type { CourierDetails } from '@delivery/types';

export interface BaseSelectors {
  selectCities: MemoizedSelector<object, DeliveryCity[]>;
  selectIsCitiesLoading: MemoizedSelector<object, boolean>;
  selectIsCitiesLoaded: MemoizedSelector<object, boolean>;
  selectCitiesError: MemoizedSelector<object, ApiError | null>;
  selectSelectedCity: MemoizedSelector<object, DeliveryCity | null>;

  selectOffices: MemoizedSelector<object, Office[]>;
  selectIsOfficesLoading: MemoizedSelector<object, boolean>;
  selectIsOfficesLoaded: MemoizedSelector<object, boolean>;
  selectOfficesError: MemoizedSelector<object, ApiError | null>;
  selectSelectedOffice: MemoizedSelector<object, Office | null>;

  selectCourierDetails: MemoizedSelector<object, CourierDetails | null>;
  selectBusPickup: MemoizedSelector<object, boolean>;
  selectForm: MemoizedSelector<object, FormState>;

  selectActiveTabId: MemoizedSelector<object, DeliveryPointTabType | null>;
}
