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
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { debounceTime, merge, startWith } from 'rxjs';
import { map } from 'rxjs/operators';

import { tuiNumberFormatProvider } from '@taiga-ui/core';
import { TuiInputNumberModule, tuiInputNumberOptionsProvider } from '@taiga-ui/legacy';

import { DEBOUNCE_TIME } from '@core/constants';
import { isObjectsEqual } from '@core/utils/object.utils';

import { Documents } from '../../types';

@Component({
  selector: 'app-documents',
  imports: [TuiInputNumberModule, ReactiveFormsModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
  providers: [
    tuiNumberFormatProvider({
      precision: 0,
    }),
    tuiInputNumberOptionsProvider({
      step: 1,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsComponent implements OnInit, OnChanges {
  @Input() data: Documents | null = null;
  @Output() dataChange = new EventEmitter<Documents>();
  @Output() validationChange = new EventEmitter<boolean>();

  quantityControl = new FormControl<number>(1, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)],
  });

  private readonly DEFAULT_QUANTITY = 1;
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (this.data) {
      this.quantityControl.setValue(this.data.quantity);
    }

    this.validationChange.emit(!this.quantityControl.invalid);

    merge(
      this.quantityControl.valueChanges.pipe(
        startWith(this.quantityControl.value),
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        map((quantity) => ({ quantity })),
      ),
      this.quantityControl.statusChanges.pipe(
        debounceTime(DEBOUNCE_TIME.DEFAULT),
        map(() => !this.quantityControl.invalid),
      ),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (typeof value === 'boolean') {
          this.validationChange.emit(value);
        } else {
          this.dataChange.emit(value);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;

    /**
     * Updates input value when active order changes.
     * If new order has no quantity data, uses default value.
     */
    if (data && !data.firstChange && !isObjectsEqual(data.previousValue, data.currentValue)) {
      this.quantityControl.setValue(this.data?.quantity ?? this.DEFAULT_QUANTITY);
    }
  }

  setMinQuantityOnBlur(isFocused: boolean): void {
    if (!isFocused && !this.quantityControl.value) {
      this.quantityControl.setValue(this.DEFAULT_QUANTITY);
    }
  }
}
