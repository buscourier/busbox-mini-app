import { MemoizedSelector } from '@ngrx/store';

import { ApiError, DeliveryCity, Office } from '@shared/types';
import { FormState } from '@shared/types/form.types';

import { CourierDetails } from '@features/delivery/types';

import { DeliveryPointTabType } from '../../types';

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
