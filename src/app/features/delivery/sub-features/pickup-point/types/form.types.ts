import { FormControl, FormGroup } from '@angular/forms';

import { Office, PickupCity } from '@shared/types';

import { CourierDetails } from '@features/delivery/types';

export type PickupPointForm = FormGroup<{
  city: FormControl<PickupCity | null>;
  office: FormControl<Office | null>;
  courierPoint: FormControl<CourierDetails | null>;
  departureDate: FormControl<string | null>;
}>;

export type ControlValues = {
  [K in keyof PickupPointForm['controls']]: PickupPointForm['controls'][K]['value'];
};
