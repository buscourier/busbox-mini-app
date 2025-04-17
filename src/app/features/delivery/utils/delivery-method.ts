import type { Office } from '@shared/types';

import type { CourierDetails } from '@delivery/types';

export const getDeliveryMethod = (
  office: Office | null,
  courier: CourierDetails | null,
  busPickup?: boolean,
) => {
  if (office) {
    return {
      label: 'Отделение',
      value: office.address,
    };
  }
  if (courier) {
    return {
      label: 'Забор курьером по адресу',
      value: `ул. ${courier.street}, д. ${courier.building}, кв. ${courier.apartment}`,
    };
  }
  if (busPickup) {
    return {
      label: 'Способ отправки',
      value: 'Встреча с автобуса',
    };
  }
  return {
    label: 'Способ отправки',
    value: 'Не указан',
  };
};
