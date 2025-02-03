import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ADDRESS_VALIDATION_LIMITS, ADDRESS_VALIDATION_MESSAGES } from '@core/constants';
import { identityMatcherById } from '@shared/utils';
import {
  TUI_VALIDATION_ERRORS,
  TuiBadge,
  TuiFieldErrorContentPipe,
  TuiFieldErrorPipe,
  TuiRadioList,
} from '@taiga-ui/kit';
import { CourierDetails } from '@features/delivery/types';
import { apartmentValidator, buildingValidator, streetValidator } from '@shared/validators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { PreferredTimeSlot } from '@shared/types';
import { PREFERRED_COURIER_TIME } from '@features/delivery/common/components/courier-details/constants';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TuiError, TuiHintDirective, TuiTextfieldOptionsDirective } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';
import { CourierDetailsForm } from '@features/delivery/common/components/courier-details/types';

@Component({
  selector: 'app-courier-details',
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldOptionsDirective,
    TuiTextfieldControllerModule,
    TuiRadioList,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiBadge,
    TuiHintDirective,
    TuiFieldErrorContentPipe,
  ],
  templateUrl: './courier-details.component.html',
  styleUrl: './courier-details.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourierDetailsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourierDetailsComponent),
      multi: true,
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: ADDRESS_VALIDATION_MESSAGES,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourierDetailsComponent implements OnInit {
  form!: CourierDetailsForm;
  readonly preferredTimeSlots = PREFERRED_COURIER_TIME;

  protected readonly identityMatcherById = identityMatcherById;
  protected readonly ADDRESS_VALIDATION_LIMITS = ADDRESS_VALIDATION_LIMITS;

  private readonly DEFAULT_TIME = this.preferredTimeSlots[0];
  private fb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);
  private onTouched!: () => void;
  private onChange!: (value: CourierDetails) => void;

  get street(): FormControl<string> {
    return this.form.controls.street;
  }

  get building(): FormControl<string> {
    return this.form.controls.building;
  }

  get apartment(): FormControl<string> {
    return this.form.controls.apartment;
  }

  get preferredTime(): FormControl<PreferredTimeSlot> {
    return this.form.controls.preferredTime;
  }

  get availableStreetLength(): number {
    const { street } = this.form.getRawValue();

    return ADDRESS_VALIDATION_LIMITS.STREET.MAX_LENGTH - street.length;
  }

  get availableBuildingLength(): number {
    const { building } = this.form.getRawValue();

    return ADDRESS_VALIDATION_LIMITS.BUILDING.MAX_LENGTH - building.length;
  }

  get availableApartmentLength(): number {
    const { apartment } = this.form.getRawValue();

    return ADDRESS_VALIDATION_LIMITS.APARTMENT.MAX_LENGTH - apartment.length;
  }

  ngOnInit(): void {
    this.initForm();
  }

  writeValue(value: CourierDetails | null): void {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    } else {
      this.form.reset({ preferredTime: this.DEFAULT_TIME }, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: CourierDetails) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  validate(): ValidationErrors | null {
    if (!this.form) {
      return { formNotInitialized: true };
    }

    const errors: ValidationErrors = {};

    Object.entries(this.form.controls).forEach(([key, control]) => {
      if (control.errors) {
        errors[key] = control.errors;
      }
    });

    return Object.keys(errors).length ? errors : null;
  }

  private initForm(): void {
    this.form = this.fb.group({
      street: [
        '',
        [
          Validators.required,
          streetValidator(),
          Validators.minLength(ADDRESS_VALIDATION_LIMITS.STREET.MIN_LENGTH),
          Validators.maxLength(ADDRESS_VALIDATION_LIMITS.STREET.MAX_LENGTH),
        ],
      ],
      building: [
        '',
        [
          Validators.required,
          buildingValidator(),
          Validators.minLength(ADDRESS_VALIDATION_LIMITS.BUILDING.MIN_LENGTH),
          Validators.maxLength(ADDRESS_VALIDATION_LIMITS.BUILDING.MAX_LENGTH),
        ],
      ],
      apartment: [
        '',
        [
          Validators.required,
          apartmentValidator(),
          Validators.minLength(ADDRESS_VALIDATION_LIMITS.APARTMENT.MIN_LENGTH),
          Validators.maxLength(ADDRESS_VALIDATION_LIMITS.APARTMENT.MAX_LENGTH),
        ],
      ],
      preferredTime: [this.DEFAULT_TIME, [Validators.required]],
    });

    this.form.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => this.form.getRawValue() as CourierDetails),
      )
      .subscribe((value) => {
        if (this.onChange) {
          this.onChange(value);
        }

        if (this.onTouched) {
          this.onTouched();
        }
      });
  }
}
