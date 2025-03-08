import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { TuiAlertService, TuiLoader } from '@taiga-ui/core';

import {
  AdditionalServicesComponent,
  AutoPartsComponent,
  CargoPickerComponent,
  DocumentsComponent,
  OrderTabsComponent,
  OtherCargoComponent,
  PackagingComponent,
  ParcelsComponent,
} from './components';
import type { DeliveryDetailsViewModel } from './store';
import { deliveryDetailsFeature, OrderActions } from './store';
import type { Order, OrderValidationState } from './types';
import { CargoType } from './types';

import type { Observable } from 'rxjs';

type OrderDataKeys = Exclude<keyof Order, 'id' | 'cargoType' | 'validation'>;

@Component({
  selector: 'app-delivery-details',
  imports: [
    AsyncPipe,
    OrderTabsComponent,
    CargoPickerComponent,
    ParcelsComponent,
    TuiLoader,
    AutoPartsComponent,
    OtherCargoComponent,
    DocumentsComponent,
    AdditionalServicesComponent,
    PackagingComponent,
  ],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryDetailsComponent implements OnInit {
  vm$!: Observable<DeliveryDetailsViewModel>;

  protected readonly MAX_ORDERS = 4;
  protected readonly CargoType = CargoType;

  private store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);

  ngOnInit(): void {
    this.vm$ = this.store.select(deliveryDetailsFeature.selectViewModel);
    this.setupErrorHandling();
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

  private setupErrorHandling(): void {
    this.vm$
      .pipe(
        map((vm) => vm.options.error),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((error) => {
        if (error) {
          this.showErrorNotification('Не удалось загрузить параметры заказа');
        }
      });
  }

  private showErrorNotification(message: string): void {
    this.alerts
      .open(message, {
        label: 'Ошибка',
        autoClose: 0,
        appearance: 'error',
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
