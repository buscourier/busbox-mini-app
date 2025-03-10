import type { MemoizedSelector } from '@ngrx/store';

import type { ApiError, FormState, Office, PickupCity } from '@shared/types';

import type { PickupPointTabType } from '@delivery/pickup-point/types';
import type { CourierDetails } from '@delivery/types';

export interface BaseSelectors {
  selectCities: MemoizedSelector<object, PickupCity[]>;
  selectIsCitiesLoading: MemoizedSelector<object, boolean>;
  selectIsCitiesLoaded: MemoizedSelector<object, boolean>;
  selectCitiesError: MemoizedSelector<object, ApiError | null>;
  selectSelectedCity: MemoizedSelector<object, PickupCity | null>;

  selectOffices: MemoizedSelector<object, Office[]>;
  selectIsOfficesLoading: MemoizedSelector<object, boolean>;
  selectIsOfficesLoaded: MemoizedSelector<object, boolean>;
  selectOfficesError: MemoizedSelector<object, ApiError | null>;
  selectSelectedOffice: MemoizedSelector<object, Office | null>;

  selectCourierDetails: MemoizedSelector<object, CourierDetails | null>;
  selectDepartureDate: MemoizedSelector<object, string | null>;
  selectForm: MemoizedSelector<object, FormState>;

  selectActiveTabId: MemoizedSelector<object, PickupPointTabType | null>;
}
