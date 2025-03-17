import type { DeliveryCity, FormState } from '@shared/types';

import type { CitiesState, CourierDetails, OfficesState } from '@delivery/types';

import type { DeliveryPointTabType } from '../types';

export interface DeliveryPointState {
  cities: CitiesState<DeliveryCity>;
  offices: OfficesState;
  courierDetails: CourierDetails | null;
  busPickup: boolean;
  form: FormState;
  activeTabId: DeliveryPointTabType | null;
}
