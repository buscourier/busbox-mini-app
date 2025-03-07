import { Injectable } from '@angular/core';

import { ApiService } from '@core/services';

import { CargoType, Order, Parcels } from '@features/delivery/delivery-details/types';
import { Courier } from '@features/delivery/types';

@Injectable({
  providedIn: 'root',
})
export class DeliveryBaseService extends ApiService {
  protected getServices(
    order: Order,
    pickupCourier: Courier | null,
    deliveryCourier: Courier | null,
  ): { id: string; value: string }[] {
    const packaging =
      order.packaging?.items.flatMap((item) =>
        Array(item.quantity).fill({ id: item.id, value: '' }),
      ) ?? [];

    const additionalServices = order.additionalServices
      ? Object.values(order.additionalServices)
          .filter(Boolean)
          .map((service) => ({
            id: service.serviceId,
            value: service?.amount || service?.phone,
          }))
      : [];

    const couriers = [pickupCourier, deliveryCourier].map((courier) => {
      if (!courier) return null;

      const { street, building, apartment, preferredTime } = courier.details;

      return {
        id: courier.id,
        value: `
         ул. ${street},
         дом. ${building},
         офис./кв. ${apartment},
         удобное время приезда ${preferredTime.label}`
          .replace(/\s+/g, ' ')
          .trim(),
      };
    });

    return [...couriers, ...packaging, ...additionalServices].filter(Boolean);
  }

  protected getCargoQuantity(order: Order) {
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
      case CargoType.PARCELS:
        quantity = this.getParcelsQuantity(order.parcels);
        break;
    }

    return quantity;
  }

  getParcelsQuantity(data: Parcels | null): number {
    if (!data) return 0;

    return data.items.reduce((sum, parcel) => {
      return sum + parcel.quantity;
    }, 0);
  }
}
