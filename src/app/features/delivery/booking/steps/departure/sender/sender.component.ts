import type { OnInit } from '@angular/core';
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
import { TuiHintDirective, TuiLabel, TuiTextfield } from '@taiga-ui/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiBadge,
  TuiChevron,
  TuiDataListWrapper,
  TuiFieldErrorContentPipe,
  TuiStringifyContentPipe,
  TuiStringifyPipe,
} from '@taiga-ui/kit';
import { TuiInputPhoneModule } from '@taiga-ui/legacy';
import { distinctUntilChanged, startWith } from 'rxjs';

import type { ValidationLimits, ValidationMessages } from '@core/config';
import { VALIDATION_LIMITS, VALIDATION_MESSAGES } from '@core/tokens';
import { isObjectsEqual } from '@core/utils';

import { FIELD_VALIDATORS_FACTORY } from '@shared/forms';

import { type Sender, SenderDocument, type SenderDocumentOption } from '../../../types';

import { defaultDocument, senderDocuments } from './sender.constants';
import type { SenderForm } from './sender.types';

@Component({
  selector: 'app-sender',
  imports: [
    TuiBadge,
    ReactiveFormsModule,
    TuiHintDirective,
    TuiFieldErrorContentPipe,
    TuiInputPhoneModule,
    TuiStringifyPipe,
    TuiStringifyContentPipe,
    TuiLabel,
    TuiTextfield,
    TuiChevron,
    TuiDataListWrapper,
  ],
  templateUrl: './sender.component.html',
  styleUrl: './sender.component.css',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useFactory: (messages: ValidationMessages) => ({
        required: messages.required,
        minlength: messages.minlength,
        maxlength: messages.maxlength,
        fullName: messages.user.fullName,
        phone: messages.phone,
        'passport.number': messages.document.passport.number,
        'driverLicense.number': messages.document.driverLicense.number,
        'other.number': messages.document.other.number,
      }),
      deps: [VALIDATION_MESSAGES],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SenderComponent implements OnInit {
  @Input() data: Sender | null = null;
  @Output() dataChange = new EventEmitter<Sender>();
  @Output() validationChange = new EventEmitter<boolean>();

  form!: SenderForm;

  protected limits = inject<ValidationLimits>(VALIDATION_LIMITS);
  protected readonly senderDocuments = senderDocuments;

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private fieldValidators = inject(FIELD_VALIDATORS_FACTORY);

  get fullName(): FormControl<string> {
    return this.form.controls.fullName;
  }

  get document(): FormControl<SenderDocumentOption> {
    return this.form.controls.document;
  }

  get documentNumber(): FormControl<string> {
    return this.form.controls.documentNumber;
  }

  get phone(): FormControl<string> {
    return this.form.controls.phone;
  }

  get availableFullNameLength(): number {
    const fullName = this.form.getRawValue().fullName as string;

    return this.limits.user.fullName.maxLength - fullName.length;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormChanges();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      fullName: ['', this.fieldValidators.getValidators('user', 'fullName')],
      document: [defaultDocument, [Validators.required]],
      documentNumber: ['', this.fieldValidators.getValidators('document', 'passport', 'number')],
      phone: ['', this.fieldValidators.getValidators('contact', 'phone')],
    });

    if (this.data) {
      this.form.patchValue(this.data);
    }

    this.document.valueChanges
      .pipe(startWith(this.data?.document || defaultDocument), takeUntilDestroyed(this.destroyRef))
      .subscribe((doc) => {
        console.log('doc.value', doc.value);

        const validatorType =
          doc.value === SenderDocument.DRIVER_LICENSE
            ? 'driverLicense'
            : doc.value === SenderDocument.PASSPORT
              ? 'passport'
              : 'other';

        this.documentNumber.setValidators(
          this.fieldValidators.getValidators(
            'document',
            validatorType as keyof ValidationLimits['document'],
            'number',
          ),
        );
        this.documentNumber.updateValueAndValidity();
      });
  }

  private setupFormChanges(): void {
    this.validationChange.emit(this.form.valid);

    this.form.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged((prev, curr) => isObjectsEqual(prev, curr)),
      )
      .subscribe(() => {
        this.validationChange.emit(this.form.valid);

        if (this.form.valid) {
          this.dataChange.emit(this.form.getRawValue());
        }
      });
  }
}
