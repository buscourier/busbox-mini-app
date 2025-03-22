import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeliveryDetailsFacade } from '@delivery/delivery-details';
import { DeliveryPointFacade } from '@delivery/delivery-point';
import { PickupPointFacade } from '@delivery/pickup-point';

import { OrderSummaryActions, orderSummaryFeature } from './store';
import type {
  DeliveryDirection,
  OrderSummaryViewModel,
  DeliveryMethods,
  OrderSummaryBaseViewModel,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class OrderSummaryFacade {
  private readonly store = inject(Store);
  private readonly pickupPointFacade = inject(PickupPointFacade);
  private readonly deliveryPointFacade = inject(DeliveryPointFacade);
  private readonly deliveryDetailsFacade = inject(DeliveryDetailsFacade);

  getViewModel(): Observable<OrderSummaryViewModel> {
    return combineLatest([
      this.getBaseViewModel(),
      this.getDeliveryDirection(),
      this.getDeliveryMethods(),
      this.deliveryDetailsFacade.getActiveOrderDetails(),
    ]).pipe(
      map(([base, direction, methods, orderDetails]) => ({
        ...base,
        direction,
        methods,
        orderDetails,
      })),
    );
  }

  private getDeliveryDirection(): Observable<DeliveryDirection | null> {
    return combineLatest([
      this.pickupPointFacade.getSelectedCity(),
      this.deliveryPointFacade.getSelectedCity(),
    ]).pipe(
      map(([pickupCity, deliveryCity]) =>
        pickupCity && deliveryCity
          ? {
              from: pickupCity.name,
              to: deliveryCity.name,
            }
          : null,
      ),
    );
  }

  private getDeliveryMethods(): Observable<DeliveryMethods> {
    return combineLatest([
      this.pickupPointFacade.getPickupTypeName(),
      this.deliveryPointFacade.getDeliveryTypeName(),
    ]).pipe(
      map(([pickup, delivery]) => ({
        pickup,
        delivery,
      })),
    );
  }

  private getBaseViewModel(): Observable<OrderSummaryBaseViewModel> {
    return this.store.select(orderSummaryFeature.selectBaseViewModel);
  }

  reset(): void {
    this.store.dispatch(OrderSummaryActions.resetState());
  }
}
