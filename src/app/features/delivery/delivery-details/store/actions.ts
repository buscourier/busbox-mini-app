import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ApiError } from '@shared/types';

import {
  AdditionalServicesData,
  AutoPartsData,
  CargoType,
  DeliveryOptions,
  DeliveryRestrictions,
  DocumentsData,
  OrderValidationState,
  OtherCargoData,
  PackagingData,
  Parcels,
  StoredDeliveryDetailsState,
} from '../types';

export const DeliveryDetailsActions = createActionGroup({
  source: 'DeliveryDetails',
  events: {
    'Load Options': props<{
      pickupCityId: string;
      deliveryCityId: string;
    }>(),
    'Load Options Success': props<{
      options: DeliveryOptions;
    }>(),
    'Load Options Failure': props<{
      error: ApiError;
    }>(),
    'Skip Load Options': emptyProps(),
    'Set Restrictions': props<{
      restrictions: DeliveryRestrictions;
    }>(),
    // 'Clear Parcel Restrictions': emptyProps(),
    'Reset Options': emptyProps(),
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
        parcels: Parcels;
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
