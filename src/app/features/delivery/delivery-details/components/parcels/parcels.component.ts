import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { debounceTime } from 'rxjs';

import { TuiAlertService, TuiButton, TuiError } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS, TuiFieldErrorPipe } from '@taiga-ui/kit';

import { DEBOUNCE_TIME } from '@core/constants';
import { isObjectsEqual } from '@core/utils/object.utils';

import { Parcel, ParcelData, ParcelLimits, ParcelsLimits } from '../../types';

import { ParcelItemComponent } from './components/parcel-item/parcel-item.component';
import { PARCEL_DEFAULTS, PARCELS_VALIDATION_MESSAGES } from './constants';
import { ParcelsErrors } from './types';
import { parcelsValidator } from './validators/parcels.validator';

@Component({
  selector: 'app-parcels',
  imports: [
    ParcelItemComponent,
    ReactiveFormsModule,
    TuiFieldErrorPipe,
    TuiError,
    AsyncPipe,
    TuiButton,
  ],
  templateUrl: './parcels.component.html',
  styleUrl: './parcels.component.css',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: PARCELS_VALIDATION_MESSAGES,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelsComponent implements OnChanges, OnInit {
  @Input() data: ParcelData | null = null;
  @Input() parcelsLimits!: ParcelsLimits;
  @Input() parcelLimits!: ParcelLimits;
  @Output() dataChange = new EventEmitter<ParcelData>();
  @Output() validationChange = new EventEmitter<boolean>();

  private readonly alerts = inject(TuiAlertService);

  /** Protected properties */
  protected canAddParcel = true;

  /** Private properties */
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  /** Public properties */
  parcels = this.fb.array<Parcel>([]);
  parcelsError = new FormControl(null);

  /** Getters */
  get errors(): ParcelsErrors {
    return this.parcelsError.errors as ParcelsErrors;
  }

  /** Lifecycle hooks */
  ngOnChanges(changes: SimpleChanges): void {
    const parcelsLimits = changes['parcelsLimits']?.currentValue;
    const parcelLimits = changes['parcelLimits']?.currentValue;

    if (
      changes['data'] &&
      !changes['data'].firstChange &&
      !isObjectsEqual(changes['data'].previousValue, changes['data'].currentValue)
    ) {
      this.reinitializeForm();
    }

    if (parcelsLimits) {
      this.updateValidator();
    }

    if (parcelLimits) {
      this.showNotification(parcelLimits);
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.updateValidator();
    this.setupValueChanges();
    this.setupErrorHandling();
  }

  /** Public methods */
  addParcel(parcel?: Parcel): void {
    this.parcels.push(
      this.fb.control(
        parcel ?? {
          quantity: PARCEL_DEFAULTS.QUANTITY,
          weight: PARCEL_DEFAULTS.WEIGHT,
          dimensions: {
            width: PARCEL_DEFAULTS.DIMENSIONS,
            height: PARCEL_DEFAULTS.DIMENSIONS,
            length: PARCEL_DEFAULTS.DIMENSIONS,
          },
        },
      ),
    );
  }

  removeParcel(index: number): void {
    this.parcels.removeAt(index);
  }

  /** Private methods */
  private initializeForm(): void {
    if (!this.data?.items.length) {
      this.addParcel();
    }

    if (this.data?.items) {
      this.data.items.forEach((parcel) => this.addParcel(parcel));
    }
  }

  private updateValidator(): void {
    this.parcels.setValidators(parcelsValidator(this.parcelsLimits));
    this.parcels.updateValueAndValidity();
  }

  private reinitializeForm(): void {
    while (this.parcels.length) {
      this.parcels.removeAt(0);
    }

    this.initializeForm();
  }

  private setupValueChanges(): void {
    this.parcels.valueChanges
      .pipe(debounceTime(DEBOUNCE_TIME.DEFAULT))
      .subscribe((parcels) => this.dataChange.emit({ items: parcels }));
  }

  private setupErrorHandling(): void {
    this.parcels.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.parcelsError.setErrors(this.parcels.errors);
      this.parcelsError.markAsTouched();
      this.canAddParcel =
        !this.parcels.invalid && this.parcels.length < (this.parcelsLimits?.MAX_PARCELS || 0);
      this.validationChange.emit(!this.parcels.invalid);
    });
  }

  protected showNotification(limits: ParcelLimits): void {
    this.alerts
      .open(
        `Cумма (Д + Ш + В) ≤ <strong>${limits.DIMENSIONS.MAX} см.</strong><br />Вес: <strong>${limits.WEIGHT.MAX} кг.</strong>`,
        {
          label: 'Ограничения посылки',
          autoClose: 5000,
          appearance: 'warning',
        },
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
