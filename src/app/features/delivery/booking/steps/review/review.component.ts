import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  merge,
  Observable,
  tap,
  withLatestFrom,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { TuiCheckbox } from '@taiga-ui/kit';
import { TuiTextareaModule } from '@taiga-ui/legacy';

import { BookingActions } from '../../store/actions';
import { bookingFeature } from '../../store/feature';
import { Review, StepNumber } from '../../types';

import { ReviewControls, ReviewModel } from './review.types';
import { selectReviewModel } from './selectors/review.selector';

export type ControlValues = {
  [K in keyof ReviewControls['controls']]: ReviewControls['controls'][K]['value'];
};

@Component({
  selector: 'app-review',
  imports: [AsyncPipe, JsonPipe, TuiTextareaModule, ReactiveFormsModule, TuiCheckbox],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent implements OnInit {
  currentStep$!: Observable<StepNumber>;
  reviewView$!: Observable<ReviewModel>;
  reviewData$!: Observable<Review>;

  form!: ReviewControls;

  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  get comment(): FormControl<string | null> {
    return this.form.controls.comment;
  }

  get rulesAccepted(): FormControl<boolean> {
    return this.form.controls.rulesAccepted;
  }

  get processingAccepted(): FormControl<boolean> {
    return this.form.controls.processingAccepted;
  }

  ngOnInit(): void {
    this.currentStep$ = this.store.select(bookingFeature.selectCurrentStep);
    this.reviewView$ = this.store.select(selectReviewModel);
    this.reviewData$ = this.store.select(bookingFeature.selectReview);
    this.initializeForm();
    this.setupFormSync();
    this.setupFormValidation();
    this.setupStoreSync();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      comment: this.fb.control<string | null>(null, [
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      rulesAccepted: this.fb.control(false, {
        nonNullable: true,
        validators: [Validators.requiredTrue],
      }),
      processingAccepted: this.fb.control(false, {
        nonNullable: true,
        validators: [Validators.requiredTrue],
      }),
    });
  }

  private setupFormSync(): void {
    const formChanges$ = merge(
      this.comment.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        map((comment) => BookingActions.updateReview({ comment })),
      ),
      this.rulesAccepted.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        map((rulesAccepted) => BookingActions.updateReview({ rulesAccepted })),
      ),
      this.processingAccepted.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        map((processingAccepted) => BookingActions.updateReview({ processingAccepted })),
      ),
    );

    formChanges$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => this.store.dispatch(action));
  }

  private setupStoreSync(): void {
    const storeData$ = merge(
      this.reviewData$.pipe(
        map((data) => data.comment),
        distinctUntilChanged(),
        tap((comment) => this.patchFormControl('comment', comment)),
      ),
      this.reviewData$.pipe(
        map((data) => data.rulesAccepted),
        tap((rulesAccepted) => this.patchFormControl('rulesAccepted', rulesAccepted)),
      ),
      this.reviewData$.pipe(
        map((data) => data.processingAccepted),
        tap((processingAccepted) =>
          this.patchFormControl('processingAccepted', processingAccepted),
        ),
      ),
    );

    storeData$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(0),
        withLatestFrom(this.currentStep$),
        tap(([, currentStep]) => {
          const isValid = this.form.valid;
          this.updateStepValidation(isValid, currentStep);
        }),
      )
      .subscribe();
  }

  setupFormValidation(): void {
    this.form.statusChanges
      .pipe(
        // startWith(this.form.status),
        map(() => this.form.valid),
        withLatestFrom(this.currentStep$),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(([isValid, currentStep]) => this.updateStepValidation(isValid, currentStep));
  }

  updateStepValidation(isValid: boolean, step: StepNumber): void {
    this.store.dispatch(
      BookingActions.updateStepValidation({
        step,
        isValid,
      }),
    );
  }

  private patchFormControl<K extends keyof ControlValues>(
    controlName: K,
    value: ControlValues[K],
  ): void {
    const control = this.form.controls[controlName] as FormControl<ControlValues[K]>;

    if (control.value !== value) {
      control.patchValue(value, { emitEvent: false });
    }
  }
}
