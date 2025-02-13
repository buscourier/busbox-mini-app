import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable, withLatestFrom } from 'rxjs';

import { Store } from '@ngrx/store';

import { DeliveryDetailsComponent } from '@features/delivery/delivery-details/delivery-details.component';
import { deliveryDetailsFeature } from '@features/delivery/delivery-details/store/feature';
import { DeliveryPointComponent } from '@features/delivery/delivery-point/delivery-point.component';
import { deliveryPointFeature } from '@features/delivery/delivery-point/store';

import { BookingActions } from '../../store/actions';
import { bookingFeature } from '../../store/feature';
import { StepNumber } from '../../types';
import { Destination } from '../../types/destination.types';
import { Recipient } from '../../types/recipient.types';

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

  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.currentStep$ = this.store.select(bookingFeature.selectCurrentStep);
    this.destination$ = this.store.select(bookingFeature.selectDestination);

    this.store
      .select(deliveryPointFeature.selectFormState)
      .pipe(withLatestFrom(this.currentStep$), takeUntilDestroyed(this.destroyRef))
      .subscribe(([formState, currentStep]) =>
        this.updateStepValidation(formState.isValid, currentStep),
      );

    this.store
      .select(deliveryDetailsFeature.selectIsAllOrdersValid)
      .pipe(withLatestFrom(this.currentStep$), takeUntilDestroyed(this.destroyRef))
      .subscribe(([isAllOrdersValid, currentStep]) =>
        this.updateStepValidation(isAllOrdersValid, currentStep),
      );
  }

  updateRecipient(data: Recipient): void {
    this.store.dispatch(BookingActions.updateRecipientData({ data }));
  }

  updateStepValidation(isValid: boolean, step: StepNumber): void {
    this.store.dispatch(
      BookingActions.updateStepValidation({
        step,
        isValid,
      }),
    );
  }
}
