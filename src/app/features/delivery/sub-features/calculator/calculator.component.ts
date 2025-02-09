import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DeliveryDetailsComponent } from '@features/delivery/delivery-details/delivery-details.component';
import { DeliveryPointComponent } from '@features/delivery/delivery-point/delivery-point.component';
import { PickupPointComponent } from '@features/delivery/pickup-point/pickup-point.component';

@Component({
  selector: 'app-calculator',
  imports: [PickupPointComponent, DeliveryPointComponent, DeliveryDetailsComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {}
