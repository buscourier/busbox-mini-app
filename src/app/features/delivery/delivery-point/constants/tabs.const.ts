import type { DeliveryPointTabConfig } from '@delivery/delivery-point/types';
import { DeliveryPointTabType } from '@delivery/delivery-point/types';
import { TabFactory } from '@delivery/factories';

export const DELIVERY_POINT_TAB_CONFIG: Record<DeliveryPointTabType, DeliveryPointTabConfig> = {
  [DeliveryPointTabType.OFFICE]: {
    apiValue: 'get',
    name: 'Сдать в отделение',
  },
  [DeliveryPointTabType.COURIER]: {
    apiValue: 'delivery',
    name: 'Вызвать курьера',
  },
  [DeliveryPointTabType.BUS]: {
    apiValue: 'need_to_meet',
    name: 'Встретить с автобуса',
  },
};

export const DELIVERY_POINT_TABS = TabFactory.createTabs<
  DeliveryPointTabType,
  DeliveryPointTabConfig
>(DELIVERY_POINT_TAB_CONFIG, { defaultTabType: DeliveryPointTabType.OFFICE });
