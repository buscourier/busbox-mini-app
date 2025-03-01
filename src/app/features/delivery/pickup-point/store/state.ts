import { PickupCity } from '@shared/types';
import { FormState } from '@shared/types/form.types';

import { CourierDetails } from '@features/delivery/types';

import { CitiesState } from '../../types/cities.types';
import { OfficesState } from '../../types/offices.types';

import { PickupPointTabType } from '../types';

export interface PickupPointState {
  cities: CitiesState<PickupCity>;
  offices: OfficesState;
  courierDetails: CourierDetails | null;
  departureDate: string | null;
  form: FormState;
  activeTabId: PickupPointTabType | null;
}
