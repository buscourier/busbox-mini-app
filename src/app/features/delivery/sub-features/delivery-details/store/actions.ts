import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  AdditionalServicesData,
  AutoPartsData,
  CargoType,
  DeliveryRestrictions,
  DeliverySettings,
  DocumentsData,
  OrderValidationState,
  OtherCargoData,
  PackagingData,
  ParcelData,
} from '@features/delivery/types';

import { StoredDeliveryDetailsState } from '../types';

export const DeliveryDetailsActions = createActionGroup({
  source: 'DeliveryDetails',
  events: {
    'Load Settings': props<{
      pickupCityId: string;
      deliveryCityId: string;
    }>(),
    'Load Settings Success': props<{
      settings: DeliverySettings;
    }>(),
    'Load Settings Failure': props<{
      error: string;
    }>(),
    'Skip Load Settings': emptyProps(),
    'Set Restrictions': props<{
      restrictions: DeliveryRestrictions;
    }>(),
    // 'Clear Parcel Restrictions': emptyProps(),
    'Reset Settings': emptyProps(),
    'Restore State': props<{
      restoredState: StoredDeliveryDetailsState;
    }>(),
  },
});

export const OrderActions = createActionGroup({
  source: 'Order',
  events: {
    Add: emptyProps(),
    Remove: props<{
      orderId: string;
    }>(),
    'Set Active': props<{
      orderId: string;
    }>(),
    'Set Cargo Type': props<{
      orderId: string;
      cargoType: CargoType;
    }>(),
    'Update Data': props<{
      orderId: string;
      data: Partial<{
        documents: DocumentsData;
        parcels: ParcelData;
        autoParts: AutoPartsData;
        otherCargo: OtherCargoData;
        packaging: PackagingData;
        additionalServices: AdditionalServicesData;
      }>;
    }>(),
    'Update Validation': props<{
      orderId: string;
      validation: Partial<OrderValidationState>;
    }>(),
    // 'Restore Skipped': emptyProps(),
    // Reset: emptyProps(),
  },
});
//
// export const PersistenceActions = createActionGroup({
//   source: 'Persistence',
//   events: {
//     'Restore State': props<{
//       restoredState: StoredOrdersState;
//     }>(),
//     'Restore Skipped': emptyProps(),
//   },
// });
