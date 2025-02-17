import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs';

import { DeliveryCity, PickupCity } from '@shared/types';

import {
  CargoType,
  CargoTypeId,
  Order,
  ParcelData,
} from '@features/delivery/delivery-details/types';
import { Courier } from '@features/delivery/types';

import { DeliveryBaseService } from '../../services/delivery-base.service';

import { Departure } from '../types/departure.types';
import { Destination } from '../types/destination.types';

import { environment } from '@env/environment';

interface Booking {
  pickupCity: PickupCity | null;
  pickupCourier: Courier | null;
  deliveryCity: DeliveryCity | null;
  deliveryCourier: Courier | null;
  departureDate: string | null;
  departure: Departure | null;
  destination: Destination | null;
  order: Order;
}

interface ParcelDimensions {
  count: number;
  weight: number;
  width: number;
  height: number;
  length: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService extends DeliveryBaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  submitOrder(booking: Booking) {
    const requestData = this.mapToRequestData(booking);
    console.log('requestData', requestData);

    return this.http.post(`${this.baseUrl}/order/`, JSON.stringify(requestData)).pipe(
      tap((response) => {
        console.log('requestResponse', response);
      }),
    );
  }

  private mapToRequestData(data: Booking) {
    const {
      pickupCity,
      deliveryCity,
      departureDate,
      departure,
      destination,
      order,
      pickupCourier,
      deliveryCourier,
    } = data;

    const { sender } = departure!;
    const { recipient } = destination!;

    return {
      'api-key': environment.apiKey,
      start_city: pickupCity!.id,
      end_city: deliveryCity!.id,
      sending_date: departureDate,
      sender_name: sender!.fullName,
      sender_phone: sender!.phone,
      sender_passport: sender!.documentNumber,
      recipient_name: recipient!.fullName,
      recipient_phone: recipient!.phone,
      orders: [
        {
          cargo_type: order.cargoType ? CargoTypeId[order.cargoType] : null,
          cargo_count: this.getCargoQuantity(order),
          dimensions:
            order.cargoType === CargoType.PARCELS ? this.mapParcelsDimensions(order.parcels) : null,
          services: this.getServices(order, pickupCourier, deliveryCourier),
        },
      ],
      note: 'Место отправления: Владивосток , ул. Русская 2А строение 3',
    };
  }

  mapParcelsDimensions(data: ParcelData | null): ParcelDimensions[] | null {
    if (!data?.items.length) return null;

    return data.items.map((item) => ({
      count: item.quantity,
      weight: item.weight,
      width: item.dimensions.width,
      height: item.dimensions.height,
      length: item.dimensions.length,
    }));
  }
}
