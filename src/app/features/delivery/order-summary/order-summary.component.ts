import { AsyncPipe, JsonPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { of, switchMap } from 'rxjs';
import type { Observable } from 'rxjs';

import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TuiButton, TuiLoader } from '@taiga-ui/core';
import type { TuiConfirmData } from '@taiga-ui/kit';
import { TUI_CONFIRM } from '@taiga-ui/kit';

import {
  type OrderSummaryViewModel,
  selectOrderSummaryViewModel,
} from '@delivery/order-summary/store/selectors';
import { DeliveryLayoutService } from '@delivery/services';
import { DeliveryActions } from '@delivery/store/actions';

@Component({
  selector: 'app-order-summary',
  imports: [TuiLoader, JsonPipe, AsyncPipe, TuiButton, RouterLink],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryComponent implements OnInit {
  vm$!: Observable<OrderSummaryViewModel>;
  isCalculatorLayout$!: Observable<boolean>;

  private store = inject(Store);
  private deliveryLayoutService = inject(DeliveryLayoutService);
  private readonly dialogs = inject(TuiResponsiveDialogService);

  ngOnInit(): void {
    this.vm$ = this.store.select(selectOrderSummaryViewModel);
    this.isCalculatorLayout$ = this.deliveryLayoutService.getIsCalculatorLayout();
  }

  protected onReset(): void {
    const data: TuiConfirmData = {
      content: 'Вся информация о заказе будет удалена!',
      yes: 'Да',
      no: 'Нет',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Вы уверены?',
        size: 's',
        data,
      })
      .pipe(
        switchMap((response) => {
          if (response) {
            this.store.dispatch(DeliveryActions.resetDelivery());
          }

          return of(response);
        }),
      )
      .subscribe();
  }
}
