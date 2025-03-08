import type { Cargo } from './cargo.types';

export interface OtherCargo {
  item: Cargo | null;
  quantity: number;
}
