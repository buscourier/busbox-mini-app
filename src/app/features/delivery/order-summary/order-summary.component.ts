import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Observable, of, switchMap } from 'rxjs';

import { Store } from '@ngrx/store';

import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TuiButton, TuiLoader } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiConfirmData } from '@taiga-ui/kit';

import { DeliveryLayoutService } from '../services';
import { DeliveryActions } from '../store/actions';
import { selectOrderSummaryViewModel } from './store/selectors/view-model.selector';
import { OrderSummaryViewModel } from './store/selectors/view-model.types';

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
