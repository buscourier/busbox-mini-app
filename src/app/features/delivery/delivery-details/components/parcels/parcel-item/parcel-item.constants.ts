import type { ParcelItem, ParcelItemLimits } from '../../../types';

export const limitKeyMap: Record<
  Exclude<keyof ParcelItem, 'dimensions'>,
  keyof ParcelItemLimits
> = {
  quantity: 'QUANTITY',
  weight: 'WEIGHT',
};
