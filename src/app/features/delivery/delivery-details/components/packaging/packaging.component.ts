import type { OnChanges, SimpleChanges } from '@angular/core';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { tuiDialog } from '@taiga-ui/core';

import type { Packaging, PackagingItem, Service } from '@delivery/delivery-details/types';

import type { OtherIds } from './packaging.constants';
import { PACKAGING_DEFAULT_QUANTITY, PackagingGroupId } from './packaging.constants';
import { PackagingDialogComponent } from './packaging-dialog/packaging-dialog.component';

@Component({
  selector: 'app-packaging',
  imports: [],
  templateUrl: './packaging.component.html',
  styleUrl: './packaging.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagingComponent implements OnChanges {
  @Input({ required: true }) options!: Service[];
  @Input() data: Packaging | null = null;
  @Output() dataChange = new EventEmitter<Packaging>();
  @Output() validationChange = new EventEmitter<boolean>();

  boxes: Service[] = [];
  safePacks: Service[] = [];
  polyPacks: Service[] = [];
  films: Service[] = [];
  other: Service[] = [];

  selectedPackagingItems = new Map<string, number>();

  dialog = tuiDialog(PackagingDialogComponent, {
    label: 'Heading',
    closeable: false,
    dismissible: false,
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.initializeGroups();
    }

    if (changes['data']) {
      this.initializeSelectedPackagingItems();
    }
  }

  selectPackagingItem(option: Service): void {
    this.dialog({
      title: option.name,
      description: option.property,
      dimensions: option.property,
      currentQuantity: this.selectedPackagingItems.get(option.id) || PACKAGING_DEFAULT_QUANTITY,
    }).subscribe({
      next: (quantity) => {
        if (quantity) {
          this.selectedPackagingItems.set(option.id, quantity);
          this.emitChange();
        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  removePackagingItem(id: string): void {
    this.selectedPackagingItems.delete(id);
    this.emitChange();
  }

  isSelected(id: string): boolean {
    return this.selectedPackagingItems.has(id);
  }

  getQuantity(id: string): number {
    return this.selectedPackagingItems.get(id) || PACKAGING_DEFAULT_QUANTITY;
  }

  private initializeGroups(): void {
    this.boxes = this.filterOptions(PackagingGroupId.BOXES);
    this.safePacks = this.filterOptions(PackagingGroupId.SAFE_PACKS);
    this.polyPacks = this.filterOptions(PackagingGroupId.POLY_PACKS);
    this.films = this.filterOptions(PackagingGroupId.FILMS);
    this.other = this.options.filter((option) =>
      PackagingGroupId.OTHER.includes(option.subgroup_id as OtherIds),
    );
  }

  private initializeSelectedPackagingItems() {
    if (this.data) {
      const { items } = this.data;

      this.selectedPackagingItems = this.createItemsMap(items);
    } else {
      this.selectedPackagingItems = new Map<string, number>();
    }
  }

  private createItemsMap(items: PackagingItem[]): Map<string, number> {
    return new Map(items.map((item) => [item.id, item.quantity]));
  }

  private filterOptions(subgroupId: string): Service[] {
    return this.options.filter((option) => option.subgroup_id === subgroupId);
  }

  private emitChange() {
    const items = Array.from(this.selectedPackagingItems.entries()).map(([id, quantity]) => ({
      id,
      quantity,
    }));

    this.dataChange.emit({ items });
  }
}
