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
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { TuiStringifyContentPipe, TuiStringifyPipe } from '@taiga-ui/kit';
import {
  TuiInputNumberModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

import { isObjectsEqual } from '@core/utils/object.utils';

import { AutoPartsData, Cargo, CargoItemRestrictions } from '../../types';

type AutoPartsForm = FormGroup<{
  [K in keyof AutoPartsData]: FormControl<AutoPartsData[K]>;
}>;

@Component({
  selector: 'app-auto-parts',
  imports: [
    TuiSelectModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiStringifyPipe,
    TuiStringifyContentPipe,
    TuiInputNumberModule,
  ],
  templateUrl: './auto-parts.component.html',
  styleUrl: './auto-parts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoPartsComponent implements OnInit, OnChanges {
  @Input() data: AutoPartsData | null = null;
  @Input() parts!: Cargo[];
  @Input() restrictions!: CargoItemRestrictions | null;
  @Output() dataChange = new EventEmitter<AutoPartsData>();
  @Output() validationChange = new EventEmitter<boolean>();

  /** Public properties */
  form!: AutoPartsForm;

  /** Private properties */
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly DEFAULT_QUANTITY = 1;

  /** Form control getters */
  get item(): FormControl<Cargo | null> {
    return this.form.controls.item;
  }

  get quantity(): FormControl<number> {
    return this.form.controls.quantity;
  }

  /** Lifecycle hooks */
  ngOnInit(): void {
    this.initializeForm();

    if (this.data) {
      this.form.patchValue(this.data, { emitEvent: false });
    }

    this.validationChange.emit(this.form.valid);

    merge(this.form.valueChanges, this.form.statusChanges.pipe(map(() => this.form.valid)))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (typeof value === 'boolean') {
          this.validationChange.emit(value);
        } else {
          this.dataChange.emit(value as AutoPartsData);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.form) return;

    const { data, restrictions } = changes;

    /**
     * Updates input value when active order changes.
     * If new order has no quantity data, uses default value.
     */
    if (data && !data.firstChange && !isObjectsEqual(data.previousValue, data.currentValue)) {
      this.form.patchValue(
        this.data ?? {
          item: null,
          quantity: 1,
        },
      );
    }

    if (restrictions) {
      this.updateFormState();
    }
  }

  /** Public methods */
  setMinQuantityOnBlur(isFocused: boolean): void {
    if (!isFocused && !this.quantity.value) {
      this.quantity.setValue(this.DEFAULT_QUANTITY);
    }
  }

  /** Private methods */
  initializeForm(): void {
    this.form = this.fb.group({
      item: this.fb.control<Cargo | null>(null, [Validators.required]),
      quantity: this.fb.control<number>(1, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.updateFormState();
  }

  private updateFormState(): void {
    if (this.hasRestriction()) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
      this.form.markAsUntouched();
    }
  }

  private hasRestriction(): boolean {
    if (!this.restrictions) {
      return false;
    }

    return !!(
      this.restrictions.startPointCourier ||
      this.restrictions.endPointCourier ||
      this.restrictions.startPointOffice ||
      this.restrictions.endPointOffice
    );
  }
}
