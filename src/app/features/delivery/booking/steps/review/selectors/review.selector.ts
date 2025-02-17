import { createSelector } from '@ngrx/store';

import { deliveryDetailsFeature } from '@features/delivery/delivery-details/store/feature';
import { deliveryPointFeature } from '@features/delivery/delivery-point/store';
import { pickupPointFeature } from '@features/delivery/pickup-point/store';

import { bookingFeature } from '../../../store/feature';

import { ReviewModel, ReviewSection } from '../review.types';
import { getDeliveryMethod } from '../utils/delivery-method';

const selectSenderSection = createSelector(
  bookingFeature.selectDeparture,
  (departure): ReviewSection => {
    const sender = departure?.sender;

    return {
      title: 'Отправитель',
      fields: [
        { label: 'ФИО', value: sender?.fullName || 'Не указан' },
        { label: 'Документ', value: sender?.document.label || 'Не указан' },
        { label: 'Номер документа', value: sender?.documentNumber || 'Не указан' },
        { label: 'Телефон', value: sender?.phone || 'Не указан' },
      ],
    };
  },
);

const selectPickupPointSection = createSelector(
  pickupPointFeature.selectSelectedCity,
  pickupPointFeature.selectSelectedOffice,
  pickupPointFeature.selectCourierDetails,
  pickupPointFeature.selectDepartureDate,
  (city, office, courier, date): ReviewSection => {
    return {
      title: 'Пункт отправления',
      fields: [
        { label: 'Населенный пункт', value: city?.name || 'Не указан' },
        { label: 'Дата отправления', value: date || 'Не указан' },
        getDeliveryMethod(office, courier),
      ],
    };
  },
);

const selectRecipientSection = createSelector(
  bookingFeature.selectDestination,
  (destination): ReviewSection => {
    const sender = destination?.recipient;

    return {
      title: 'Получатель',
      fields: [
        { label: 'ФИО', value: sender?.fullName || 'Не указан' },
        { label: 'Телефон', value: sender?.phone || 'Не указан' },
      ],
    };
  },
);

const selectDeliveryPointSection = createSelector(
  deliveryPointFeature.selectSelectedCity,
  deliveryPointFeature.selectSelectedOffice,
  deliveryPointFeature.selectCourierDetails,
  deliveryPointFeature.selectBusPickup,
  (city, office, courier, busPickup): ReviewSection => ({
    title: 'Пункт отправления',
    fields: [
      { label: 'Населенный пункт', value: city?.name || 'Не указан' },
      getDeliveryMethod(office, courier, busPickup),
    ],
  }),
);

export const selectReviewModel = createSelector(
  selectSenderSection,
  selectPickupPointSection,
  selectRecipientSection,
  selectDeliveryPointSection,
  deliveryDetailsFeature.selectActiveOrderDetails,
  (sender, pickupPoint, recipient, deliveryPoint, order): ReviewModel => ({
    sections: [sender, pickupPoint, recipient, deliveryPoint],
    order,
  }),
);
