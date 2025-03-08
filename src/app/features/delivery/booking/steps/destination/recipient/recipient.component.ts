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
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { TuiHintDirective } from '@taiga-ui/core';
import { TuiBadge, TuiFieldErrorContentPipe } from '@taiga-ui/kit';
import { TuiInputModule, TuiInputPhoneModule } from '@taiga-ui/legacy';

import { USER_VALIDATION_LIMITS } from '@core/constants/user-validation.const';
import { isObjectsEqual } from '@core/utils/object.utils';

import { phoneValidator } from '@shared/validators';
import { fullNameValidator } from '@shared/validators/user.validators';

import { Recipient } from '../../../types';

import { RecipientForm } from './recipient.types';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipientComponent implements OnInit, OnChanges {
  @Input() data: Recipient | null = null;
  @Output() dataChange = new EventEmitter<Recipient>();
  @Output() validationChange = new EventEmitter<boolean>();

  form!: RecipientForm;

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  get fullName(): FormControl<string> {
    return this.form.controls.fullName;
  }

  get phone(): FormControl<string> {
    return this.form.controls.phone;
  }

  get availableFullNameLength(): number {
    const { fullName } = this.form.getRawValue();

    return USER_VALIDATION_LIMITS.FULL_NAME.MAX_LENGTH - fullName.length;
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
      fullName: [
        '',
        [
          Validators.required,
          fullNameValidator(),
          Validators.minLength(USER_VALIDATION_LIMITS.FULL_NAME.MIN_LENGTH),
          Validators.minLength(USER_VALIDATION_LIMITS.FULL_NAME.MAX_LENGTH),
        ],
      ],
      phone: ['', [Validators.required, phoneValidator()]],
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

  protected readonly USER_VALIDATION_LIMITS = USER_VALIDATION_LIMITS;
}
