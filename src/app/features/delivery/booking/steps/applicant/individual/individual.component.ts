import type { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { FormControl } from '@angular/forms';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { TuiHintDirective } from '@taiga-ui/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiBadge,
  TuiFieldErrorContentPipe,
  TuiStringifyContentPipe,
  TuiStringifyPipe,
} from '@taiga-ui/kit';
import { TuiInputModule, TuiInputPhoneModule, TuiSelectModule } from '@taiga-ui/legacy';

import {
  EMAIL_VALIDATION_MESSAGES,
  PHONE_VALIDATION_MESSAGES,
  USER_VALIDATION_LIMITS,
  USER_VALIDATION_MESSAGES,
} from '@core/constants';
import { isObjectsEqual } from '@core/utils';

import {
  firstNameValidator,
  lastNameValidator,
  middleNameValidator,
  phoneValidator,
} from '@shared/validators';

import type { Individual } from '@delivery/booking/types';

import { individualRoles } from './individual.constants';
import type { IndividualForm } from './individual.types';

@Component({
  selector: 'app-individual',
  imports: [
    TuiBadge,
    ReactiveFormsModule,
    TuiFieldErrorContentPipe,
    TuiInputModule,
    TuiHintDirective,
    TuiSelectModule,
    TuiStringifyPipe,
    TuiStringifyContentPipe,
    TuiInputPhoneModule,
  ],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        ...USER_VALIDATION_MESSAGES,
        ...PHONE_VALIDATION_MESSAGES,
        ...EMAIL_VALIDATION_MESSAGES,
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualComponent implements OnInit, OnChanges {
  @Input() data: Individual | null = null;
  @Output() dataChange = new EventEmitter<Individual>();
  @Output() validationChange = new EventEmitter<boolean>();

  form!: IndividualForm;

  protected readonly individualRoles = individualRoles;

  private fb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);

  get lastName(): FormControl<string> {
    return this.form.controls.lastName;
  }

  get firstName(): FormControl<string> {
    return this.form.controls.firstName;
  }

  get middleName(): FormControl<string> {
    return this.form.controls.middleName;
  }

  get email(): FormControl<string> {
    return this.form.controls.email;
  }

  get phone(): FormControl<string> {
    return this.form.controls.phone;
  }

  get role(): FormControl<string> {
    return this.form.controls.role;
  }

  get availableLastNameLength(): number {
    const { lastName } = this.form.getRawValue();

    return USER_VALIDATION_LIMITS.LAST_NAME.MAX_LENGTH - lastName.length;
  }

  get availableFirstNameLength(): number {
    const { firstName } = this.form.getRawValue();

    return USER_VALIDATION_LIMITS.FIRST_NAME.MAX_LENGTH - firstName.length;
  }

  get availableMiddleNameLength(): number {
    const { middleName } = this.form.getRawValue();

    return USER_VALIDATION_LIMITS.MIDDLE_NAME.MAX_LENGTH - middleName.length;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormChanges();
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.form) return;

    const { data } = changes;

    if (data && !data.firstChange && !isObjectsEqual(data.previousValue, data.currentValue)) {
      this.updateData();
    }
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      lastName: [
        '',
        [
          Validators.required,
          lastNameValidator(),
          Validators.minLength(USER_VALIDATION_LIMITS.LAST_NAME.MIN_LENGTH),
          Validators.minLength(USER_VALIDATION_LIMITS.LAST_NAME.MAX_LENGTH),
        ],
      ],
      firstName: [
        '',
        [
          Validators.required,
          firstNameValidator(),
          Validators.minLength(USER_VALIDATION_LIMITS.FIRST_NAME.MIN_LENGTH),
          Validators.minLength(USER_VALIDATION_LIMITS.FIRST_NAME.MAX_LENGTH),
        ],
      ],
      middleName: [
        '',
        [
          Validators.required,
          middleNameValidator(),
          Validators.minLength(USER_VALIDATION_LIMITS.MIDDLE_NAME.MIN_LENGTH),
          Validators.minLength(USER_VALIDATION_LIMITS.MIDDLE_NAME.MAX_LENGTH),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneValidator()]],
      role: ['', [Validators.required]],
    });
  }

  private setupFormChanges(): void {
    this.validationChange.emit(this.form.valid);

    merge(this.form.valueChanges, this.form.statusChanges.pipe(map(() => this.form.valid)))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (typeof value === 'boolean') {
          this.validationChange.emit(value);
        } else {
          this.dataChange.emit(value as Individual);
        }
      });
  }

  private updateData(): void {
    this.form.patchValue(
      this.data ?? {
        lastName: '',
        firstName: '',
        middleName: '',
        email: '',
        phone: '',
        role: '',
      },
    );
  }

  protected readonly USER_VALIDATION_LIMITS = USER_VALIDATION_LIMITS;
}
