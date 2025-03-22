import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import type { Observable } from 'rxjs';

import { DeliveryLayoutService } from '@delivery/services';

import { BookingFacade } from './booking.facade';
import { StepperComponent } from './stepper';
import type { StepNumber, BookingViewModel } from './types';

@Component({
  selector: 'app-booking',
  imports: [RouterOutlet, TuiButton, AsyncPipe, StepperComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnInit {
  vm$!: Observable<BookingViewModel>;
  isMainLayout$!: Observable<boolean>;

  private layoutService = inject(DeliveryLayoutService);
  private bookingFacade = inject(BookingFacade);

  ngOnInit(): void {
    this.vm$ = this.bookingFacade.getViewModel();
    this.isMainLayout$ = this.layoutService.getIsMainLayout();

    this.bookingFacade.init();
  }

  goNextStep(nextStep: StepNumber | null): void {
    if (nextStep) {
      this.bookingFacade.navigateToStep(nextStep);
    }
  }

  goPrevStep(prevStep: StepNumber | null): void {
    if (prevStep) {
      this.bookingFacade.navigateToStep(prevStep);
    }
  }

  submitOrder(): void {
    this.bookingFacade.submitOrder();
  }
}
