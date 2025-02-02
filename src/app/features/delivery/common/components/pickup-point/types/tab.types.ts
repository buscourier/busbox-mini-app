import { ApiTab } from '@shared/types';

export interface PickupPointTabConfig {
  apiValue: PickupPointApiValue;
  name: string;
}

export const PickupPointTabType = {
  OFFICE: 'OFFICE',
  COURIER: 'COURIER',
} as const;

export type PickupPointTabType = (typeof PickupPointTabType)[keyof typeof PickupPointTabType];
export type PickupPointApiValue = 'give' | 'pickup';
export type PickupPointTab = ApiTab<PickupPointTabType, PickupPointApiValue>;
