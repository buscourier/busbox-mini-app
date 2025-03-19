import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import type { Observable } from 'rxjs';

import type { OrderDataKeys } from './delivery-details.types';
import { DeliveryDetailsActions, OrderActions, deliveryDetailsFeature } from './store';
import type { CargoType, Order, OrderValidationState, DeliveryDetailsViewModel } from './types';

@Injectable({
  providedIn: 'root',
})
export class DeliveryDetailsFacade {
  private readonly store = inject(Store);

  getViewModel(): Observable<DeliveryDetailsViewModel> {
    return this.store.select(deliveryDetailsFeature.selectViewModel);
  }

  addOrder(): void {
    this.store.dispatch(OrderActions.add());
  }

  removeOrder(orderId: string): void {
    this.store.dispatch(OrderActions.remove({ orderId }));
  }

  setActiveOrder(orderId: string): void {
    this.store.dispatch(OrderActions.setActive({ orderId }));
  }

  getOrders(): Observable<Order[]> {
    return this.store.select(deliveryDetailsFeature.selectAll);
  }

  setCargoType(orderId: string, cargoType: CargoType): void {
    this.store.dispatch(OrderActions.setCargoType({ orderId, cargoType }));
  }

  updateOrderData(orderId: string, type: OrderDataKeys, data: Order[OrderDataKeys]): void {
    this.store.dispatch(
      OrderActions.updateData({
        orderId,
        data: { [type]: data },
      }),
    );
  }

  updateOrderValidation(orderId: string, type: keyof OrderValidationState, isValid: boolean) {
    this.store.dispatch(
      OrderActions.updateValidation({
        orderId,
        validation: { [type]: isValid },
      }),
    );
  }

  isActiveOrderValid(): Observable<boolean> {
    return this.store.select(deliveryDetailsFeature.selectIsActiveOrderValid);
  }

  isAllOrdersValid(): Observable<boolean> {
    return this.store.select(deliveryDetailsFeature.selectIsAllOrdersValid);
  }

  resetOptions(): void {
    this.store.dispatch(DeliveryDetailsActions.resetOptions());
  }
}
