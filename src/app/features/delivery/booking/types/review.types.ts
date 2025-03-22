import type { ActiveOrderDetails } from '@delivery/delivery-details/types';
import type { ReviewSection } from '@delivery/types';

export interface Review {
  comment: string | null;
  rulesAccepted: boolean;
  processingAccepted: boolean;
}

export interface ReviewModel {
  sections: ReviewSection[];
  order: ActiveOrderDetails;
}
