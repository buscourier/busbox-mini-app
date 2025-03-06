import { FormControl, FormGroup } from '@angular/forms';

import { ActiveOrderDetails } from '@features/delivery/delivery-details/types';

import { Review } from '../../types';

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

export type ReviewControls = FormGroup<{
  [K in keyof Review]: FormControl<Review[K]>;
}>;
