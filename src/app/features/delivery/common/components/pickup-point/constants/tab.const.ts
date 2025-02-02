import { TabFactory } from '@features/delivery/factories';
import {
  PickupPointTabType,
  PickupPointTabConfig,
} from '@features/delivery/common/components/pickup-point/types';

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

export const PICKUP_POINT_TABS = TabFactory.createStartPointTabs();
