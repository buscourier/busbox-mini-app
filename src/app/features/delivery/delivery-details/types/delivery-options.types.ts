import { Cargo } from './cargo.types';
import { Service } from './service.types';

export interface DeliveryOptions {
  cargos: Cargo[];
  services: Service[];
}
