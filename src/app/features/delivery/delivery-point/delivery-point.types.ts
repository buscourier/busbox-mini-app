import type { FormControl, FormGroup } from '@angular/forms';

import type { Action } from '@ngrx/store';

import type { DeliveryCity, Office } from '@shared/types';

import type { CourierDetails } from '@delivery/types';

export interface ResetConfig {
  controls: FormControl[];
  actions: Action[];
  cleanup?: () => void;
}

export type DeliveryPointForm = FormGroup<{
  city: FormControl<DeliveryCity | null>;
  office: FormControl<Office | null>;
  courierDetails: FormControl<CourierDetails | null>;
  busPickup: FormControl<boolean>;
}>;

export type DeliveryPointControlValues = {
  [K in keyof DeliveryPointForm['controls']]: DeliveryPointForm['controls'][K]['value'];
};
