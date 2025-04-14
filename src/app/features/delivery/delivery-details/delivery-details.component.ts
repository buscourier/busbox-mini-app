import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiAlertService } from '@taiga-ui/core';
import { TuiSkeleton } from '@taiga-ui/kit';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
import { cargoSwitchAnimation } from './delivery-details.animations';
import { DeliveryDetailsFacade } from './delivery-details.facade';
import type { OrderDataKeys } from './delivery-details.types';
import type { Order, OrderValidationState, DeliveryDetailsViewModel } from './types';
import { CargoType } from './types';

@Component({
  selector: 'app-delivery-details',
  imports: [
    AsyncPipe,
    OrderTabsComponent,
    CargoPickerComponent,
    ParcelsComponent,
    AutoPartsComponent,
    OtherCargoComponent,
    DocumentsComponent,
    AdditionalServicesComponent,
    PackagingComponent,
    TuiSkeleton,
  ],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cargoSwitchAnimation],
  host: {
    class: 'block mt-16',
  },
})
export class DeliveryDetailsComponent implements OnInit {
  vm$!: Observable<DeliveryDetailsViewModel>;

  protected readonly MAX_ORDERS = 1;
  protected readonly CargoType = CargoType;

  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);
  private readonly deliveryDetailsFacade = inject(DeliveryDetailsFacade);

  ngOnInit(): void {
    this.vm$ = this.deliveryDetailsFacade.getViewModel();
    this.setupErrorHandling();
  }

  addOrder(): void {
    this.deliveryDetailsFacade.addOrder();
  }

  removeOrder(orderId: string): void {
    this.deliveryDetailsFacade.removeOrder(orderId);
  }

  setActiveOrder(orderId: string): void {
    this.deliveryDetailsFacade.setActiveOrder(orderId);
  }

  setCargoType(orderId: string, cargoType: CargoType): void {
    this.deliveryDetailsFacade.setCargoType(orderId, cargoType);
  }

  updateOrderData(orderId: string, type: OrderDataKeys, data: Order[OrderDataKeys]): void {
    this.deliveryDetailsFacade.updateOrderData(orderId, type, data);
  }

  updateOrderValidation(orderId: string, type: keyof OrderValidationState, isValid: boolean) {
    this.deliveryDetailsFacade.updateOrderValidation(orderId, type, isValid);
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
