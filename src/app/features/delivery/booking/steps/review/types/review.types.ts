import { ActiveOrderDetails } from '@features/delivery/delivery-details/types';

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
