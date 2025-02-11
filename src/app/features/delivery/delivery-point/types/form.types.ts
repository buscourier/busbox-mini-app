import { FormControl, FormGroup } from '@angular/forms';

import { DeliveryCity, Office } from '@shared/types';

import { CourierDetails } from '@features/delivery/types';

export type DeliveryPointForm = FormGroup<{
  city: FormControl<DeliveryCity | null>;
  office: FormControl<Office | null>;
  courierDetails: FormControl<CourierDetails | null>;
  busPickup: FormControl<boolean>;
}>;

export type ControlValues = {
  [K in keyof DeliveryPointForm['controls']]: DeliveryPointForm['controls'][K]['value'];
};
