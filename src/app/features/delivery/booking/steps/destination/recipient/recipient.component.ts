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
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TuiHintDirective } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS, TuiBadge, TuiFieldErrorContentPipe } from '@taiga-ui/kit';
import { TuiInputModule, TuiInputPhoneModule } from '@taiga-ui/legacy';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import type { ValidationLimits, ValidationMessages } from '@core/config';
import { VALIDATION_LIMITS, VALIDATION_MESSAGES } from '@core/tokens';
import { isObjectsEqual } from '@core/utils';

import { FIELD_VALIDATORS_FACTORY } from '@shared/forms';

import type { Recipient } from '../../../types';

import type { RecipientForm } from './recipient.types';

@Component({
  selector: 'app-recipient',
  imports: [
    TuiBadge,
    TuiInputPhoneModule,
    TuiHintDirective,
    TuiFieldErrorContentPipe,
    ReactiveFormsModule,
    TuiInputModule,
  ],
  templateUrl: './recipient.component.html',
  styleUrl: './recipient.component.css',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useFactory: (messages: ValidationMessages) => ({
        required: messages.required,
        minlength: messages.minlength,
        maxlength: messages.maxlength,
        fullName: messages.user.fullName,
        phone: messages.phone,
      }),
      deps: [VALIDATION_MESSAGES],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipientComponent implements OnInit, OnChanges {
  @Input() data: Recipient | null = null;
  @Output() dataChange = new EventEmitter<Recipient>();
  @Output() validationChange = new EventEmitter<boolean>();

  form!: RecipientForm;

  protected limits = inject<ValidationLimits>(VALIDATION_LIMITS);

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private fieldValidators = inject(FIELD_VALIDATORS_FACTORY);

  get fullName(): FormControl<string> {
    return this.form.controls.fullName;
  }

  get phone(): FormControl<string> {
    return this.form.controls.phone;
  }

  get availableFullNameLength(): number {
    const { fullName } = this.form.getRawValue();

    return this.limits.user.fullName.maxLength - fullName.length;
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
      fullName: ['', this.fieldValidators.getValidators('user', 'fullName')],
      phone: ['', this.fieldValidators.getValidators('contact', 'phone')],
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
          this.dataChange.emit(value as Recipient);
        }
      });
  }

  private updateData(): void {
    this.form.patchValue(
      this.data ?? {
        fullName: '',
        phone: '',
      },
    );
  }
}
