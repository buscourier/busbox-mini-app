import { AsyncPipe, JsonPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { FormControl } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiCheckbox } from '@taiga-ui/kit';
import { TuiTextareaModule } from '@taiga-ui/legacy';
import { debounceTime, distinctUntilChanged, filter, merge, tap, withLatestFrom } from 'rxjs';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookingFacade } from '../../booking.facade';
import type { Review, ReviewModel, StepNumber } from '../../types';

import type { ReviewControlValues, ReviewForm } from './review.types';

@Component({
  selector: 'app-review',
  imports: [AsyncPipe, JsonPipe, TuiTextareaModule, ReactiveFormsModule, TuiCheckbox],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent implements OnInit {
  currentStep$!: Observable<StepNumber>;
  reviewModel$!: Observable<ReviewModel>;
  reviewData$!: Observable<Review>;

  form!: ReviewForm;

  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  private readonly bookingFacade = inject(BookingFacade);

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
    this.currentStep$ = this.bookingFacade.getCurrentStep();
    this.reviewData$ = this.bookingFacade.getReviewData();
    this.reviewModel$ = this.bookingFacade.getReviewModel();

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
        filter(Boolean),
        map((comment) => ({ comment })),
      ),
      this.rulesAccepted.valueChanges.pipe(map((rulesAccepted) => ({ rulesAccepted }))),
      this.processingAccepted.valueChanges.pipe(
        map((processingAccepted) => ({ processingAccepted })),
      ),
    );

    formChanges$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((reviewData) => {
      this.bookingFacade.updateReview(reviewData);
    });
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
    this.bookingFacade.updateStepValidation(isValid, step);
  }

  private patchFormControl<K extends keyof ReviewControlValues>(
    controlName: K,
    value: ReviewControlValues[K],
  ): void {
    const control = this.form.controls[controlName] as FormControl<ReviewControlValues[K]>;

    if (control.value !== value) {
      control.patchValue(value, { emitEvent: false });
    }
  }
}
