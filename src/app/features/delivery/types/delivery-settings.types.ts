import { Service } from '@features/delivery/types/service.types';
import { Cargo } from '@features/delivery/types/cargo.types';

export interface DeliverySettings {
  cargos: Cargo[];
  services: Service[];
}
