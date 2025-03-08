import type { ApiTab, TabConfig } from '@shared/types';

export type DeliveryPointApiValue = 'get' | 'delivery' | 'need_to_meet';

export interface DeliveryPointTabConfig extends TabConfig {
  apiValue: DeliveryPointApiValue;
}

export const DeliveryPointTabType = {
  OFFICE: 'OFFICE',
  COURIER: 'COURIER',
  BUS: 'BUS',
} as const;

export type DeliveryPointTabType = (typeof DeliveryPointTabType)[keyof typeof DeliveryPointTabType];
export type DeliveryPointTab = ApiTab<DeliveryPointTabType, DeliveryPointApiValue>;
