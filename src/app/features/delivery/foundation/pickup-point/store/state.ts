import { CitiesState, CourierDetails, FormState, OfficesState } from '@delivery/types';
import { PickupCity } from '@shared/types';
import { PickupPointTabType } from '@delivery/foundation/pickup-point/types';

export interface PickupPointState {
  cities: CitiesState<PickupCity>;
  offices: OfficesState;
  courierDetails: CourierDetails | null;
  departureDate: string | null;
  form: FormState;
  activeTabId: PickupPointTabType | null;
}
