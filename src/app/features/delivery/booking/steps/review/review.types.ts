import type { FormControl, FormGroup } from '@angular/forms';

import type { Review } from '@delivery/booking/types';
import type { ActiveOrderDetails } from '@delivery/delivery-details/types';

export interface ReviewField {
  label: string;
  value: string | number;
}

export interface ReviewSection {
  title: string;
  fields: ReviewField[];
}

export interface ReviewModel {
  sections: ReviewSection[];
  order: ActiveOrderDetails;
}

export type ReviewForm = FormGroup<{
  [K in keyof Review]: FormControl<Review[K]>;
}>;

export type ReviewControlValues = {
  [K in keyof ReviewForm['controls']]: ReviewForm['controls'][K]['value'];
};
