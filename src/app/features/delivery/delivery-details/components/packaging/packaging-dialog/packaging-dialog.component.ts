import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { type TuiDialogContext, TuiLabel, TuiTextfield } from '@taiga-ui/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiInputNumberDirective, TuiInputNumberStep } from '@taiga-ui/kit';
import { injectContext } from '@taiga-ui/polymorpheus';

import { PACKAGING_DEFAULT_QUANTITY } from './packaging-dialog.constants';
import type { SelectedPackagingItem } from './packaging-dialog.types';

@Component({
  selector: 'app-packaging-dialog',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiInputNumberDirective,
    TuiInputNumberStep,
    TuiLabel,
    TuiTextfield,
  ],
  templateUrl: './packaging-dialog.component.html',
  styleUrl: './packaging-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagingDialogComponent {
  readonly context = injectContext<TuiDialogContext<number, SelectedPackagingItem>>();

  quantity = new FormControl(this.data.currentQuantity, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(PACKAGING_DEFAULT_QUANTITY)],
  });

  protected readonly DEFAULT_QUANTITY = PACKAGING_DEFAULT_QUANTITY;

  protected get data(): SelectedPackagingItem {
    return this.context.data;
  }

  setMinQuantityOnBlur(): void {
    if (!this.quantity.value) {
      this.quantity.setValue(PACKAGING_DEFAULT_QUANTITY);
    }
  }

  onSubmit() {
    if (this.quantity.valid) {
      this.context.completeWith(this.quantity.value);
    }
  }
}
