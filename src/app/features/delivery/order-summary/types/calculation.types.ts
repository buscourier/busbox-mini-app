import type { Order } from '@delivery/delivery-details/types';
import type { Courier } from '@delivery/types';

export interface BaseCalculationParams {
  pickupCityId: string | null;
  deliveryCityId: string | null;
  pickupCourier: Courier | null;
  deliveryCourier: Courier | null;
}

export interface OrderAmountParams extends BaseCalculationParams {
  order: Order;
}

export interface TotalAmountParams extends BaseCalculationParams {
  orders: Order[];
}

export interface CalculationRequestParams {
  pickupCityId: string | null;
  deliveryCityId: string | null;
  cargo: string;
  servicesIds: string[] | null;
  weight: number;
  dimensions: number;
}

export interface TotalAmount {
  price: number;
}
