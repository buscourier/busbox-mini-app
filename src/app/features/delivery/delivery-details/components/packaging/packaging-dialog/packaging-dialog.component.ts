import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import type { TuiDialogContext } from '@taiga-ui/core';
import { TuiButton, tuiNumberFormatProvider } from '@taiga-ui/core';
import { TuiInputNumberModule, tuiInputNumberOptionsProvider } from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';

import { PACKAGING_DEFAULT_QUANTITY } from './packaging-dialog.constants';
import type { SelectedPackagingItem } from './packaging-dialog.types';

@Component({
  selector: 'app-packaging-dialog',
  imports: [TuiInputNumberModule, ReactiveFormsModule, TuiButton],
  templateUrl: './packaging-dialog.component.html',
  styleUrl: './packaging-dialog.component.css',
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
export class PackagingDialogComponent {
  readonly context = injectContext<TuiDialogContext<number, SelectedPackagingItem>>();

  quantityControl = new FormControl(this.data.currentQuantity, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(PACKAGING_DEFAULT_QUANTITY)],
  });

  protected readonly DEFAULT_QUANTITY = PACKAGING_DEFAULT_QUANTITY;

  protected get data(): SelectedPackagingItem {
    return this.context.data;
  }

  setMinQuantityOnBlur(isFocused: boolean): void {
    if (!isFocused && !this.quantityControl.value) {
      this.quantityControl.setValue(PACKAGING_DEFAULT_QUANTITY);
    }
  }

  onSubmit() {
    if (this.quantityControl.valid) {
      this.context.completeWith(this.quantityControl.value);
    }
  }
}
