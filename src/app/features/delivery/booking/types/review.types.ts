import type { ActiveOrderDetails } from '@delivery/delivery-details/types';
import type { ReviewSection } from '@delivery/types';

export interface ReviewConfirmation {
  comment: string | null;
  rulesAccepted: boolean;
  processingAccepted: boolean;
}

export interface Review {
  confirmation: ReviewConfirmation;
}

export interface ReviewView {
  sections: ReviewSection[];
  order: ActiveOrderDetails;
}
