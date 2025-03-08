import type { Office, PickupCity } from '@shared/types';

import type { CourierDetails } from '@features/delivery/types';

import type { PickupPointTabType } from './tab.types';

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
