import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';

import { take, withLatestFrom } from 'rxjs';
import type { Observable } from 'rxjs';

import { BookingActions } from '@delivery/booking/store/actions';
import { bookingFeature } from '@delivery/booking/store/feature';
import type { Destination, Recipient, StepNumber } from '@delivery/booking/types';
import { DeliveryDetailsComponent } from '@delivery/delivery-details/delivery-details.component';
import { deliveryDetailsFeature } from '@delivery/delivery-details/store/feature';
import { DeliveryPointComponent } from '@delivery/delivery-point/delivery-point.component';
import { deliveryPointFeature } from '@delivery/delivery-point/store/feature';

import { RecipientComponent } from './recipient/recipient.component';

@Component({
  selector: 'app-destination',
  imports: [AsyncPipe, RecipientComponent, DeliveryPointComponent, DeliveryDetailsComponent],
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

  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.currentStep$ = this.store.select(bookingFeature.selectCurrentStep);
    this.destination$ = this.store.select(bookingFeature.selectDestination);

    this.store
      .select(deliveryPointFeature.selectFormState)
      .pipe(withLatestFrom(this.currentStep$), takeUntilDestroyed(this.destroyRef))
      .subscribe(([formState]) => {
        this.isDeliveryPointValid = formState.valid;
        this.checkStepValidation();
      });

    this.store
      .select(deliveryDetailsFeature.selectIsAllOrdersValid)
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
      this.store.dispatch(
        BookingActions.updateStepValidation({
          step: currentStep,
          isValid: isStepValid,
        }),
      );
    });
  }

  updateRecipient(data: Recipient): void {
    this.store.dispatch(BookingActions.updateRecipientData({ data }));
  }
}
