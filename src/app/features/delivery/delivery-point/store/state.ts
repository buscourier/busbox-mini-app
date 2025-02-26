import { DeliveryCity } from '@shared/types';
import { FormState } from '@shared/types/form.types';

import { CitiesState, CourierDetails, OfficesState } from '@features/delivery/types';

import { DeliveryPointTabType } from '../types';

export interface DeliveryPointState {
  cities: CitiesState<DeliveryCity>;
  offices: OfficesState;
  courierDetails: CourierDetails | null;
  busPickup: boolean;
  form: FormState;
  activeTabId: DeliveryPointTabType | null;
}
