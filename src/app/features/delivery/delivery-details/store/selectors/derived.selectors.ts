import { createSelector } from '@ngrx/store';

import { PACKAGE_NAMES } from '../../constants';
import {
  ActiveOrderDetails,
  CargoType,
  CargoTypeId,
  CargoTypesGroup,
  Order,
  PackagingDetails,
  Service,
} from '../../types';
import { getAutoParts, getDocuments, getOtherCargo, getParcels } from '../../utils/cargo-utils';

import { BaseSelectors } from './base-selectors.types';
import { DerivedSelectors } from './derived-selectors.types';

export const createDerivedSelectors = (baseSelectors: BaseSelectors): DerivedSelectors => {
  const isOrderValid = (order: Order): boolean => {
    const { cargoType, validation } = order;

    if (!cargoType) return false;

    const isCargoValid = (() => {
      switch (cargoType) {
        case CargoType.DOCUMENTS:
          return validation.documents ?? false;
        case CargoType.PARCELS:
          return validation.parcels ?? false;
        case CargoType.AUTO_PARTS:
          return validation.autoParts ?? false;
        case CargoType.OTHER:
          return validation.otherCargo ?? false;
        default:
          return false;
      }
    })();

    return (
      isCargoValid && (validation.packaging ?? true) && (validation.additionalServices ?? true)
    );
  };

  const selectActiveOrder = createSelector(
    baseSelectors.selectEntities,
    baseSelectors.selectActiveOrderId,
    (entities, activeId) => {
      if (!activeId) return null;
      return entities[activeId] ?? null; // явно преобразуем undefined в null
    },
  );

  const selectIsActiveOrderValid = createSelector(selectActiveOrder, (order): boolean => {
    if (!order) return false;

    return isOrderValid(order);
  });

  const selectEnhancedOrders = createSelector(
    baseSelectors.selectAll,
    baseSelectors.selectActiveOrderId,
    selectIsActiveOrderValid,
    (orders, activeId, isActiveOrderValid) =>
      orders.map((order, index) => ({
        ...order,
        number: index + 1,
        isActive: order.id === activeId,
        isActiveInvalid: order.id === activeId && !isActiveOrderValid,
        isDisabled: order.id !== activeId && !isActiveOrderValid,
      })),
  );

  const selectIsAllOrdersValid = createSelector(baseSelectors.selectAll, (orders): boolean => {
    // Если нет заказов - считаем что все валидно
    if (!orders.length) return true;

    // Проверяем что все заказы валидны
    return orders.every((order) => isOrderValid(order));
  });

  const selectCargoTypes = createSelector(
    baseSelectors.selectSettings,
    (settings): CargoTypesGroup => {
      const cargos = Array.isArray(settings?.cargos) ? settings.cargos : [];

      return {
        root: cargos.filter((cargo) => cargo.parent_id === CargoTypeId.ROOT),
        autoParts: cargos.filter((cargo) => cargo.parent_id === CargoTypeId.AUTO_PARTS),
        other: cargos.filter((cargo) => cargo.parent_id === CargoTypeId.OTHER),
      };
    },
  );

  const selectAdditionalServices = createSelector(
    baseSelectors.selectSettings,
    (settings): Service[] => {
      const services = settings?.services || [];

      return services.filter((service) => service.group_id === '3');
    },
  );

  const selectPackaging = createSelector(
    baseSelectors.selectSettings,
    (settings) => settings?.services.filter((s) => s.group_id === '1') || [],
  );

  const selectActiveOrderPackaging = createSelector(
    selectActiveOrder,
    selectPackaging,
    (order, packaging): { items: PackagingDetails[] } | null => {
      if (!order?.packaging?.items.length) return null;

      const servicesMap = new Map(packaging.map((item) => [item.id, item]));

      return {
        items: order.packaging.items.map((item) => ({
          type:
            PACKAGE_NAMES[servicesMap.get(item.id)?.subgroup_id || ''] || 'Неизвестная упаковка',
          variant: servicesMap.get(item.id)?.site_name || '',
          price: servicesMap.get(item.id)?.price || '',
          quantity: item.quantity,
        })),
      };
    },
  );

  const selectActiveOrderDetails = createSelector(
    selectActiveOrder,
    selectActiveOrderPackaging,
    (order, packaging): ActiveOrderDetails => ({
      cargoType: order?.cargoType || null,
      documents: order?.cargoType === CargoType.DOCUMENTS ? getDocuments(order.documents) : null,
      parcels: order?.cargoType === CargoType.PARCELS ? getParcels(order.parcels) : null,
      autoParts: order?.cargoType === CargoType.AUTO_PARTS ? getAutoParts(order.autoParts) : null,
      otherCargo: order?.cargoType === CargoType.OTHER ? getOtherCargo(order.otherCargo) : null,
      packaging,
      additionalServices: order?.additionalServices || null,
    }),
  );

  return {
    selectActiveOrder,
    selectIsActiveOrderValid,
    selectIsAllOrdersValid,
    selectEnhancedOrders,
    selectCargoTypes,
    selectAdditionalServices,
    selectPackaging,
    selectActiveOrderDetails,
  };
};
