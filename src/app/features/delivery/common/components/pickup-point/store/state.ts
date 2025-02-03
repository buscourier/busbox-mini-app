import { CitiesState, CourierDetails, FormState, OfficesState } from '@features/delivery/types';
import { PickupCity } from '@shared/types';
import { PickupPointTabType } from '@features/delivery/common/components/pickup-point/types';

export interface PickupPointState {
  cities: CitiesState<PickupCity>;
  offices: OfficesState;
  courierDetails: CourierDetails | null;
  departureDate: string | null;
  form: FormState;
  activeTabId: PickupPointTabType | null;
}
