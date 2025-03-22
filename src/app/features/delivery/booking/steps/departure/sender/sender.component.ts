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
import { TuiHintDirective } from '@taiga-ui/core';
import {
  TuiBadge,
  TuiFieldErrorContentPipe,
  TuiStringifyContentPipe,
  TuiStringifyPipe,
} from '@taiga-ui/kit';
import { TuiInputModule, TuiInputPhoneModule, TuiSelectModule } from '@taiga-ui/legacy';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { USER_VALIDATION_LIMITS } from '@core/constants';
import { isObjectsEqual } from '@core/utils';

import { fullNameValidator, phoneValidator } from '@shared/validators';

import type { Sender, SenderDocumentOption } from '../../../types';

import { defaultDocument, senderDocuments } from './sender.constants';
import type { SenderForm } from './sender.types';

@Component({
  selector: 'app-sender',
  imports: [
    TuiBadge,
    TuiInputModule,
    ReactiveFormsModule,
    TuiHintDirective,
    TuiFieldErrorContentPipe,
    TuiInputPhoneModule,
    TuiSelectModule,
    TuiStringifyPipe,
    TuiStringifyContentPipe,
  ],
  templateUrl: './sender.component.html',
  styleUrl: './sender.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SenderComponent implements OnInit, OnChanges {
  @Input() data: Sender | null = null;
  @Output() dataChange = new EventEmitter<Sender>();
  @Output() validationChange = new EventEmitter<boolean>();

  form!: SenderForm;

  protected readonly senderDocuments = senderDocuments;

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);

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
      document: [defaultDocument, [Validators.required]],
      documentNumber: ['', [Validators.required]],
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
          this.dataChange.emit(value as Sender);
        }
      });
  }

  private updateData(): void {
    this.form.patchValue(
      this.data ?? {
        fullName: '',
        document: defaultDocument,
        documentNumber: '',
        phone: '',
      },
    );
  }

  protected readonly USER_VALIDATION_LIMITS = USER_VALIDATION_LIMITS;
}
