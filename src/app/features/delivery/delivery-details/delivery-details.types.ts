import type { Order } from './types';

export type OrderDataKeys = Exclude<keyof Order, 'id' | 'cargoType' | 'validation'>;
