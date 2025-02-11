import { Cargo } from './cargo.types';
import { Service } from './service.types';

export interface DeliverySettings {
  cargos: Cargo[];
  services: Service[];
}
