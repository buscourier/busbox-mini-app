import { PickupPointTabType } from './tab.types';
import { Office, PickupCity } from '@shared/types';
import { CourierDetails } from '@features/delivery/types';

export interface StoredPickupPointState {
  activeTabId: PickupPointTabType | null;
  cities: {
    selected: PickupCity | null;
  };
  offices: {
    selected: Office | null;
  };
  courierDetails: CourierDetails | null;
  departureDate: string | null;
}
