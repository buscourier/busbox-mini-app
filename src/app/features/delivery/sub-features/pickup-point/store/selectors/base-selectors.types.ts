import { MemoizedSelector } from '@ngrx/store';

import { ApiError, Office, PickupCity } from '@shared/types';

import { CourierDetails, FormState } from '@features/delivery/types';

import { PickupPointTabType } from '../../types';

export interface BaseSelectors {
  selectCities: MemoizedSelector<object, PickupCity[]>;
  selectIsCitiesLoading: MemoizedSelector<object, boolean>;
  selectCitiesError: MemoizedSelector<object, ApiError | null>;
  selectSelectedCity: MemoizedSelector<object, PickupCity | null>;

  selectOffices: MemoizedSelector<object, Office[]>;
  selectIsOfficesLoading: MemoizedSelector<object, boolean>;
  selectOfficesError: MemoizedSelector<object, ApiError | null>;
  selectSelectedOffice: MemoizedSelector<object, Office | null>;

  selectCourierDetails: MemoizedSelector<object, CourierDetails | null>;
  selectDepartureDate: MemoizedSelector<object, string | null>;
  selectFormState: MemoizedSelector<object, FormState>;

  selectActiveTabId: MemoizedSelector<object, PickupPointTabType | null>;
}
