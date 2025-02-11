import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DeliveryDetailsComponent } from '../delivery-details/delivery-details.component';
import { DeliveryPointComponent } from '../delivery-point/delivery-point.component';
import { PickupPointComponent } from '../pickup-point/pickup-point.component';

@Component({
  selector: 'app-calculator',
  imports: [PickupPointComponent, DeliveryPointComponent, DeliveryDetailsComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {}
