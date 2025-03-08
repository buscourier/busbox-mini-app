import { TabFactory } from '@features/delivery/factories';

import type { PickupPointTabConfig } from '../types';
import { PickupPointTabType } from '../types';

export const PICKUP_POINT_TAB_CONFIG: Record<PickupPointTabType, PickupPointTabConfig> = {
  [PickupPointTabType.OFFICE]: {
    apiValue: 'give',
    name: 'Сдать в отделение',
  },
  [PickupPointTabType.COURIER]: {
    apiValue: 'pickup',
    name: 'Вызвать курьера',
  },
};

export const PICKUP_POINT_TABS = TabFactory.createTabs<PickupPointTabType, PickupPointTabConfig>(
  PICKUP_POINT_TAB_CONFIG,
  { defaultTabType: PickupPointTabType.OFFICE },
);
