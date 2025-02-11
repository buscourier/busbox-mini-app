import { Order } from '../../delivery-details/types';

export interface BaseCalculationParams {
  pickupCityId: string | null;
  deliveryCityId: string | null;
  pickupPointCourierId: string | null;
  deliveryPointCourierId: string | null;
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
  cargoData: string;
  servicesIds: number[] | null;
  weight: number;
  dimensions: number;
}

export interface TotalAmount {
  price: number;
}
