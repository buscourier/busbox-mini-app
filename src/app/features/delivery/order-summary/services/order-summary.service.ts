import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeliveryBaseService } from '@features/delivery/services';
import { Courier } from '@features/delivery/types';

import { CargoType, CargoTypeId, Order } from '../../delivery-details/types';

import {
  CalculationRequestParams,
  OrderAmountParams,
  TotalAmount,
  TotalAmountParams,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class OrderSummaryService extends DeliveryBaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  calculateTotalAmount(params: TotalAmountParams): Observable<TotalAmount> {
    return forkJoin(
      params.orders.map((order) =>
        this.calculateOrderAmount({
          pickupCityId: params.pickupCityId,
          deliveryCityId: params.deliveryCityId,
          pickupCourier: params.pickupCourier,
          deliveryCourier: params.deliveryCourier,
          order,
        }),
      ),
    ).pipe(
      map((results) => ({
        price: results.reduce((sum, { price }) => sum + price, 0),
      })),
    );
  }

  calculateOrderAmount(params: OrderAmountParams): Observable<TotalAmount> {
    const servicesIds = this.getServicesIds(
      params.order,
      params.pickupCourier,
      params.deliveryCourier,
    );

    return params.order.cargoType === CargoType.PARCELS
      ? this.calculateParcelsAmount(params, servicesIds)
      : this.calculateCargoAmount(params, servicesIds);
  }

  private calculateParcelsAmount(
    params: OrderAmountParams,
    servicesIds: string[],
  ): Observable<TotalAmount> {
    if (!params.order.parcels?.items.length) {
      return of({ price: 0 });
    }

    return forkJoin([
      this.calculateParcelsWithoutServices(params),
      this.makeCalculationRequest({
        pickupCityId: params.pickupCityId,
        deliveryCityId: params.deliveryCityId,
        cargo: '0',
        servicesIds,
        weight: 0,
        dimensions: 0,
      }),
    ]).pipe(
      map((results) => ({
        price: results.reduce((sum, { price }) => sum + price, 0),
      })),
    );
  }

  private calculateCargoAmount(
    params: OrderAmountParams,
    servicesIds: string[],
  ): Observable<TotalAmount> {
    const order = params.order;

    return this.makeCalculationRequest({
      pickupCityId: params.pickupCityId,
      deliveryCityId: params.deliveryCityId,
      cargo: order.cargoType
        ? `${CargoTypeId[order.cargoType]}, ${this.getCargoQuantity(order)}`
        : '',
      servicesIds,
      weight: 0,
      dimensions: 0,
    });
  }

  private calculateParcelsWithoutServices(params: OrderAmountParams): Observable<TotalAmount> {
    const parcels = params.order.parcels!.items;

    return forkJoin(
      parcels.map((parcel) => {
        const dimensions =
          parcel.dimensions.width + parcel.dimensions.height + parcel.dimensions.length;

        return this.makeCalculationRequest({
          pickupCityId: params.pickupCityId,
          deliveryCityId: params.deliveryCityId,
          cargo: params.order.cargoType ? CargoTypeId[params.order.cargoType] : '',
          servicesIds: null,
          weight: parcel.weight,
          dimensions,
        }).pipe(map(({ price }) => price * parcel.quantity));
      }),
    ).pipe(
      map((prices) => ({
        price: prices.reduce((sum, price) => sum + price, 0),
      })),
    );
  }

  private getServicesIds(
    order: Order,
    pickupCourier: Courier | null,
    deliveryCourier: Courier | null,
  ): string[] {
    const services = this.getServices(order, pickupCourier, deliveryCourier);

    return services.map((service) => service.id);
  }

  private makeCalculationRequest(params: CalculationRequestParams): Observable<TotalAmount> {
    return this.http.get<TotalAmount>(
      `${this.baseUrl}/calc/${params.pickupCityId}/${params.deliveryCityId}/` +
        `${params.cargo}/${params.servicesIds}/${params.weight}/${params.dimensions}`,
    );
  }
}
