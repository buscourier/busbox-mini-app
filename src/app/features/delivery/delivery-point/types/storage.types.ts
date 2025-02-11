import { DeliveryCity, Office } from '@shared/types';

import { CourierDetails } from '@features/delivery/types';

import { DeliveryPointTabType } from './tab.types';

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
