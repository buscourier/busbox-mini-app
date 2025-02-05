import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderSummaryComponent } from '@delivery/foundation/order-summary';

@Component({
  selector: 'app-delivery',
  imports: [RouterOutlet, OrderSummaryComponent],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryComponent {}
