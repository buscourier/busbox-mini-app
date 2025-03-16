import type { FormControl, FormGroup } from '@angular/forms';

import type { Office, PickupCity } from '@shared/types';

import type { CourierDetails } from '@delivery/types';

export interface ResetConfig {
  control: FormControl;
  reset: () => void;
  cleanup?: () => void;
}

export type PickupPointForm = FormGroup<{
  city: FormControl<PickupCity | null>;
  office: FormControl<Office | null>;
  courierPoint: FormControl<CourierDetails | null>;
  departureDate: FormControl<string | null>;
}>;

export type PickupPointControlValues = {
  [K in keyof PickupPointForm['controls']]: PickupPointForm['controls'][K]['value'];
};
