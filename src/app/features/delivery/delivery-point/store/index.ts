import { DeliveryPointActions } from './actions';

export { deliveryPointFeature } from './feature';
export { DeliveryPointEffects } from './effects';

/** Actions api  */
export const selectDeliveryPointCity = DeliveryPointActions.selectCity;
export const restoreDeliveryPointState = DeliveryPointActions.restoreState;
