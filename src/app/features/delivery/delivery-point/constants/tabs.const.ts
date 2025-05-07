import { TabFactory } from '@delivery/factories';

import type { DeliveryPointTabConfig } from '../types';
import { DeliveryPointTabType } from '../types';

export const DELIVERY_POINT_TAB_CONFIG: Record<DeliveryPointTabType, DeliveryPointTabConfig> = {
  [DeliveryPointTabType.OFFICE]: {
    apiValue: 'get',
    name: 'deliveryPoint.methods.get',
  },
  [DeliveryPointTabType.COURIER]: {
    apiValue: 'delivery',
    name: 'deliveryPoint.methods.delivery',
  },
  [DeliveryPointTabType.BUS]: {
    apiValue: 'need_to_meet',
    name: 'deliveryPoint.methods.busPickup',
  },
};

export const DELIVERY_POINT_TABS = TabFactory.createTabs<
  DeliveryPointTabType,
  DeliveryPointTabConfig
>(DELIVERY_POINT_TAB_CONFIG, { defaultTabType: DeliveryPointTabType.OFFICE });
