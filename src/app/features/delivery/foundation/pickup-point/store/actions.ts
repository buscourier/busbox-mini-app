import { ApiError, Office, PickupCity } from '@shared/types';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  PickupPointTabType,
  StoredPickupPointState,
} from '@delivery/foundation/pickup-point/types';
import { CourierDetails } from '@delivery/types';

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
    'Set Form Validity': props<{ isValid: boolean }>(),
    'Set Departure Date': props<{ departureDate: string }>(),

    'Init State': emptyProps(),
    'Restore State': props<{ restoredState: StoredPickupPointState }>(),
    'Init Skipped': emptyProps(),

    /**
     * Resets form data with optional parameters:
     * @param keepCity - When true, preserves the currently selected city
     * @param city - Optional city to set after reset
     */
    'Reset Form Data': props<{
      keepCity?: boolean;
      city?: PickupCity;
    }>(),
  },
});
