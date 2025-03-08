import type { FormState, PickupCity } from '@shared/types';

import type { CitiesState, CourierDetails, OfficesState } from '@features/delivery/types';

import type { PickupPointTabType } from '../types';

export interface PickupPointState {
  cities: CitiesState<PickupCity>;
  offices: OfficesState;
  courierDetails: CourierDetails | null;
  departureDate: string | null;
  form: FormState;
  activeTabId: PickupPointTabType | null;
}
