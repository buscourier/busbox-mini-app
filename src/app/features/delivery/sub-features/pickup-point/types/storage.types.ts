import { Office, PickupCity } from '@shared/types';

import { PickupPointTabType } from '@features/delivery/pickup-point/types/tab.types';
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
