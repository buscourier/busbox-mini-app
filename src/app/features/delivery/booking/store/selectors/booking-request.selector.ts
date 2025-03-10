import { createSelector } from '@ngrx/store';

import { bookingFeature } from '@delivery/booking/store';
import { deliveryDetailsFeature } from '@delivery/delivery-details/store/feature';
import { CargoType, CargoTypeId } from '@delivery/delivery-details/types';
import { deliveryPointFeature } from '@delivery/delivery-point/store';
import { pickupPointFeature } from '@delivery/pickup-point/store';

// function getServices(
//   pickupTabId: PickupPointTabType,
//   deliveryTabId: DeliveryPointTabType,
//   packaging: { items: PackagingDetails[] } | null,
//   additionalServices: AdditionalServicesData | null,
// ) {
//   console.log('additionalServices', pickupMethod);
// }

export const selectBookingRequest = createSelector(
  pickupPointFeature.selectSelectedCity,
  pickupPointFeature.selectActiveTabId,
  deliveryPointFeature.selectSelectedCity,
  deliveryPointFeature.selectActiveTabId,
  pickupPointFeature.selectDepartureDate,
  bookingFeature.selectDeparture,
  bookingFeature.selectDestination,
  deliveryDetailsFeature.selectActiveOrderDetails,
  (
    pickupCity,
    pickupTabId,
    deliveryCity,
    deliveryTabId,
    departureDate,
    departure,
    destination,
    order,
  ) => {
    if (!pickupCity || !deliveryCity || !departureDate || !departure || !destination || !order) {
      return null;
    }

    const { sender } = departure;
    const { recipient } = destination;

    if (!sender || !recipient) return null;

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

    console.log('OOOORDEEEER', order);

    // const services = getServices(
    //   pickupTabId,
    //   deliveryTabId,
    //   order?.additionalServices,
    //   order?.packaging,
    // );

    return {
      start_city: pickupCity.id,
      end_city: deliveryCity.id,
      sending_date: departureDate,
      sender_name: sender.fullName,
      sender_phone: sender.phone,
      sender_passport: sender.documentNumber,
      recipient_name: recipient.fullName,
      recipient_phone: recipient.phone,
      orders: [
        {
          cargo_type: order.cargoType ? CargoTypeId[order.cargoType] : null,
          cargo_count: quantity,
          // services,
        },
      ],
    };
  },
);
