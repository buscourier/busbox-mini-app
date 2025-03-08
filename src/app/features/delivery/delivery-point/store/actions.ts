import { createActionGroup, emptyProps, props } from '@ngrx/store';

import type { ApiError, DeliveryCity, FormControlStatus, Office } from '@shared/types';

import type { CourierDetails } from '@features/delivery/types';

import type { DeliveryPointTabType, StoredDeliveryPointState } from '../types';

export const DeliveryPointActions = createActionGroup({
  source: 'DeliveryPoint',
  events: {
    // Cities
    'Load Cities': props<{ startCityId: string }>(),
    'Load Cities Success': props<{ cities: DeliveryCity[] }>(),
    'Load Cities Failure': props<{ error: ApiError }>(),
    'Select City': props<{ city: DeliveryCity }>(),

    // Offices
    'Load Offices': emptyProps(),
    'Load Offices Success': props<{ offices: Office[] }>(),
    'Load Offices Failure': props<{ error: ApiError }>(),
    'Select Office': props<{ office: Office }>(),
    'Reset Office': emptyProps(),

    // Tabs
    'Set Active Tab Id': props<{ activeTabId: DeliveryPointTabType }>(),
    'Reset Active Tab Id': emptyProps(),

    // Courier point
    'Update Courier Details': props<{ courierDetails: CourierDetails }>(),
    'Reset Courier Details': emptyProps(),

    // Bus pickup
    'Set Bus Pickup': props<{ enabled: boolean }>(),

    // Form state
    'Set Form State': props<{
      status: FormControlStatus;
      pristine: boolean;
      touched: boolean;
      dirty: boolean;
    }>(),

    // Persistence
    'Init State': emptyProps(),
    'Restore State': props<{ restoredState: StoredDeliveryPointState }>(),
    'Init Skipped': emptyProps(),

    /**
     * Resets form data with optional parameters:
     * @param keepCity - When true, preserves the currently selected city
     * @param city - Optional city to set after reset
     */
    'Reset State': props<{
      keepCity?: boolean;
      city?: DeliveryCity;
    }>(),
  },
});
