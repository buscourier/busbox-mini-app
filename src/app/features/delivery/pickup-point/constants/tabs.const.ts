import { TabFactory } from '@delivery/factories';

import type { PickupPointTabConfig } from '../types';
import { PickupPointTabType } from '../types';

export const PICKUP_POINT_TAB_CONFIG: Record<PickupPointTabType, PickupPointTabConfig> = {
  [PickupPointTabType.OFFICE]: {
    apiValue: 'give',
    name: 'pickupPoint.methods.give',
  },
  [PickupPointTabType.COURIER]: {
    apiValue: 'pickup',
    name: 'pickupPoint.methods.pickup',
  },
};

export const PICKUP_POINT_TABS = TabFactory.createTabs<PickupPointTabType, PickupPointTabConfig>(
  PICKUP_POINT_TAB_CONFIG,
  { defaultTabType: PickupPointTabType.OFFICE },
);
