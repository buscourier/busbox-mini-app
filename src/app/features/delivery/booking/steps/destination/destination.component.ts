import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable, take, withLatestFrom } from 'rxjs';

import { Store } from '@ngrx/store';

import { DeliveryDetailsComponent } from '@features/delivery/delivery-details/delivery-details.component';
import { deliveryDetailsFeature } from '@features/delivery/delivery-details/store/feature';
import { DeliveryPointComponent } from '@features/delivery/delivery-point/delivery-point.component';
import { deliveryPointFeature } from '@features/delivery/delivery-point/store';

import { BookingActions } from '../../store/actions';
import { bookingFeature } from '../../store/feature';
import { Destination, Recipient, StepNumber } from '../../types';

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
