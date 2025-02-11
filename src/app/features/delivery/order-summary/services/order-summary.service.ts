import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CargoType, CargoTypeId, Order } from '../../delivery-details/types';

import {
  CalculationRequestParams,
  CourierIds,
  OrderAmountParams,
  TotalAmount,
  TotalAmountParams,
} from '../types';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderSummaryService {
  private readonly url = `${environment.apiUrl}`;

  constructor(protected http: HttpClient) {}

  calculateTotalAmount(params: TotalAmountParams): Observable<TotalAmount> {
    return forkJoin(
      params.orders.map((order) =>
        this.calculateOrderAmount({
          pickupCityId: params.pickupCityId,
          deliveryCityId: params.deliveryCityId,
          pickupPointCourierId: params.pickupPointCourierId,
          deliveryPointCourierId: params.deliveryPointCourierId,
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
    const servicesIds = this.getServicesIds(params.order, {
      pickup: params.pickupPointCourierId,
      delivery: params.deliveryPointCourierId,
    });

    return params.order.cargoType === CargoType.PARCELS
      ? this.calculateParcelsAmount(params, servicesIds)
      : this.calculateCargoAmount(params, servicesIds);
  }

  private calculateParcelsAmount(
    params: OrderAmountParams,
    servicesIds: number[],
  ): Observable<TotalAmount> {
    if (!params.order.parcels?.items.length) {
      return of({ price: 0 });
    }

    return forkJoin([
      this.calculateParcelsWithoutServices(params),
      this.makeCalculationRequest({
        pickupCityId: params.pickupCityId,
        deliveryCityId: params.deliveryCityId,
        cargoData: '0',
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
    servicesIds: number[],
  ): Observable<TotalAmount> {
    const order = params.order;
    let quantity = 0;

    switch (order.cargoType) {
      case CargoType.DOCUMENTS:
        quantity = order.documents?.quantity || 0;
        break;
      case CargoType.AUTO_PARTS:
        quantity = order.autoParts?.quantity || 0;
        break;
      case CargoType.OTHER:
        quantity = order.otherCargo?.quantity || 0;
        break;
    }

    return this.makeCalculationRequest({
      pickupCityId: params.pickupCityId,
      deliveryCityId: params.deliveryCityId,
      cargoData: order.cargoType ? `${CargoTypeId[order.cargoType]}, ${quantity}` : '',
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
          cargoData: params.order.cargoType ? CargoTypeId[params.order.cargoType] : '',
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

  private getServicesIds(order: Order, courierIds: CourierIds): number[] {
    const packagingIds =
      order.packaging?.items.flatMap((item) =>
        Array(item.quantity + 1)
          .join(item.id + ' ')
          .split(' '),
      ) ?? [];

    const additionalIds = order.additionalServices
      ? Object.values(order.additionalServices)
          .filter(Boolean)
          .map((service) => service.serviceId)
      : [];

    return [courierIds.pickup, courierIds.delivery, ...packagingIds, ...additionalIds].filter(
      Boolean,
    );
  }

  private makeCalculationRequest(params: CalculationRequestParams): Observable<TotalAmount> {
    return this.http.get<TotalAmount>(
      `${this.url}/calc/${params.pickupCityId}/${params.deliveryCityId}/` +
        `${params.cargoData}/${params.servicesIds}/${params.weight}/${params.dimensions}`,
    );
  }
}
