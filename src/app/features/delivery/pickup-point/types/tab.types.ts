import type { ApiTab, TabConfig } from '@shared/types';

export type PickupPointApiValue = 'give' | 'pickup';

export interface PickupPointTabConfig extends TabConfig {
  apiValue: PickupPointApiValue;
}

export const PickupPointTabType = {
  OFFICE: 'OFFICE',
  COURIER: 'COURIER',
} as const;

export type PickupPointTabType = (typeof PickupPointTabType)[keyof typeof PickupPointTabType];
export type PickupPointTab = ApiTab<PickupPointTabType, PickupPointApiValue>;
