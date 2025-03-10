import { createActionGroup, emptyProps, props } from '@ngrx/store';

import type { ApiError, FormControlStatus, Office, PickupCity } from '@shared/types';

import type { PickupPointTabType, StoredPickupPointState } from '@delivery/pickup-point/types';
import type { CourierDetails } from '@delivery/types';

export const PickupPointActions = createActionGroup({
  source: 'PickupPoint',
  events: {
    'Load Cities': emptyProps(),
    'Load Cities Success': props<{ cities: PickupCity[] }>(),
    'Load Cities Failure': props<{ error: ApiError }>(),
    'Select City': props<{ city: PickupCity }>(),

    'Load Offices': emptyProps(),
    'Load Offices Success': props<{ offices: Office[] }>(),
    'Load Offices Failure': props<{ error: ApiError }>(),
    'Select Office': props<{ office: Office }>(),
    'Reset Office': emptyProps(),

    'Set Active Tab Id': props<{ activeTabId: PickupPointTabType }>(),
    'Reset Active Tab Id': emptyProps(),

    'Update Courier Details': props<{ courierDetails: CourierDetails }>(),
    'Reset Courier Details': emptyProps(),
    'Set Form State': props<{
      status: FormControlStatus;
      pristine: boolean;
      touched: boolean;
      dirty: boolean;
    }>(),
    'Set Departure Date': props<{ departureDate: string }>(),

    'Init State': emptyProps(),
    'Restore State': props<{ restoredState: StoredPickupPointState }>(),
    'Init Skipped': emptyProps(),

    /**
     * Resets form data with optional parameters:
     * @param keepCity - When true, preserves the currently selected city
     * @param city - Optional city to set after reset
     */
    'Reset State': props<{
      keepCity?: boolean;
      city?: PickupCity;
    }>(),
  },
});
