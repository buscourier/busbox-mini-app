import type { DeliveryCity, Office } from '@shared/types';

import type { CourierDetails } from '@delivery/types';

import type { DeliveryPointTabType } from './tab.types';

export interface StoredDeliveryPointState {
  activeTabId: DeliveryPointTabType | null;
  cities: {
    selected: DeliveryCity | null;
  };
  offices: {
    selected: Office | null;
  };
  courierPoint: CourierDetails | null;
  busPickup: boolean;
}
