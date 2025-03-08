import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { TuiAlertService, TuiLoader } from '@taiga-ui/core';

import { AdditionalServicesComponent } from './components/additional-services/additional-services.component';
import { AutoPartsComponent } from './components/auto-parts/auto-parts.component';
import { CargoPickerComponent } from './components/cargo-picker/cargo-picker.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { OrderTabsComponent } from './components/order-tabs/order-tabs.component';
import { OtherCargoComponent } from './components/other-cargo/other-cargo.component';
import { PackagingComponent } from './components/packaging/packaging.component';
import { ParcelsComponent } from './components/parcels/parcels.component';
import { OrderActions } from './store/actions';
import { deliveryDetailsFeature } from './store/feature';
import { DeliveryDetailsViewModel } from './store/selectors/view-model.types';
import { CargoType, Order, OrderValidationState } from './types';

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

  protected readonly CargoType = CargoType;
}
