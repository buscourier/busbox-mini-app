import { createAction, createActionGroup, emptyProps } from '@ngrx/store';

export const resetDelivery = createAction('[Delivery] Reset');

export const DeliveryActions = createActionGroup({
  source: 'Delivery',
  events: {
    'Reset Delivery': emptyProps(),
  },
});
