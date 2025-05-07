import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { take, withLatestFrom } from 'rxjs';
import type { Observable } from 'rxjs';

import { DeliveryDetailsComponent, DeliveryDetailsFacade } from '@delivery/delivery-details';
import { DeliveryPointComponent, DeliveryPointFacade } from '@delivery/delivery-point';

import { BookingFacade } from '../../booking.facade';
import type { Destination, Recipient, StepNumber } from '../../types';

import { RecipientComponent } from './recipient';

@Component({
  selector: 'app-destination',
  imports: [
    AsyncPipe,
    RecipientComponent,
    DeliveryPointComponent,
    DeliveryDetailsComponent,
    TranslocoPipe,
  ],
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationComponent implements OnInit {
  currentStep$!: Observable<StepNumber>;
  destination$!: Observable<Destination | null>;

  private isDeliveryPointValid = false;
  private isDeliveryDetailsValid = false;
  private isRecipientValid = false;

  private readonly destroyRef = inject(DestroyRef);
  private readonly bookingFacade = inject(BookingFacade);
  private readonly deliveryPointFacade = inject(DeliveryPointFacade);
  private readonly deliveryDetailsFacade = inject(DeliveryDetailsFacade);

  ngOnInit(): void {
    this.currentStep$ = this.bookingFacade.getCurrentStep();
    this.destination$ = this.bookingFacade.getDestination();

    this.deliveryPointFacade
      .getFormState()
      .pipe(withLatestFrom(this.currentStep$), takeUntilDestroyed(this.destroyRef))
      .subscribe(([formState]) => {
        this.isDeliveryPointValid = formState.valid;
        this.checkStepValidation();
      });

    this.deliveryDetailsFacade
      .isAllOrdersValid()
      .pipe(withLatestFrom(this.currentStep$), takeUntilDestroyed(this.destroyRef))
      .subscribe(([isOrdersValid]) => {
        this.isDeliveryDetailsValid = isOrdersValid;
        this.checkStepValidation();
      });
  }

  onRecipientValidationChange(isValid: boolean): void {
    this.isRecipientValid = isValid;
    this.checkStepValidation();
  }

  private checkStepValidation(): void {
    const isStepValid =
      this.isDeliveryPointValid && this.isDeliveryDetailsValid && this.isRecipientValid;

    this.currentStep$.pipe(take(1)).subscribe((currentStep) => {
      this.bookingFacade.updateStepValidation(isStepValid, currentStep);
    });
  }

  updateRecipient(data: Recipient): void {
    this.bookingFacade.updateRecipient(data);
  }
}
