import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DeliveryDetailsComponent } from '@delivery/delivery-details/delivery-details.component';
import { DeliveryPointComponent } from '@delivery/delivery-point/delivery-point.component';
import { PickupPointComponent } from '@delivery/pickup-point/pickup-point.component';

@Component({
  selector: 'app-calculator',
  imports: [PickupPointComponent, DeliveryPointComponent, DeliveryDetailsComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {}
