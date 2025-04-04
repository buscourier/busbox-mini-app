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
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiLabel, TuiTextfield, TuiTextfieldComponent } from '@taiga-ui/core';
import { TuiInputNumber } from '@taiga-ui/kit';
import { debounceTime, merge, startWith } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEBOUNCE_TIME } from '@core/constants';
import { isObjectsEqual } from '@core/utils';

import type { Documents } from '../../types';

@Component({
  selector: 'app-documents',
  imports: [ReactiveFormsModule, TuiInputNumber, TuiLabel, TuiTextfieldComponent, TuiTextfield],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
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

  setMinQuantityOnBlur(): void {
    if (!this.quantityControl.value) {
      this.quantityControl.setValue(this.DEFAULT_QUANTITY);
    }
  }
}
