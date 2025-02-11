import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { tuiDialog } from '@taiga-ui/core';

import { PackagingData, PackagingItem, Service } from '../../types';

import { PackagingDialogComponent } from './components/packaging-dialog';
import { OtherIds, PACKAGING_DEFAULT_QUANTITY, PackagingId } from './constants';

@Component({
  selector: 'app-packaging',
  imports: [],
  templateUrl: './packaging.component.html',
  styleUrl: './packaging.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagingComponent implements OnChanges {
  @Input({ required: true }) services!: Service[];
  @Input() data: PackagingData | null = null;
  @Output() dataChange = new EventEmitter<PackagingData>();
  @Output() validationChange = new EventEmitter<boolean>();

  /** Packaging groups */
  boxes: Service[] = [];
  safePacks: Service[] = [];
  polyPacks: Service[] = [];
  films: Service[] = [];
  other: Service[] = [];

  /** Selected packages */
  selectedItems = new Map<string, number>();

  dialog = tuiDialog(PackagingDialogComponent, {
    label: 'Heading',
    closeable: false,
    dismissible: false,
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['services']) {
      this.initializeGroups();
    }

    if (changes['data']) {
      this.initializeSelectedItems();
    }
  }

  selectPackage(service: Service): void {
    this.dialog({
      title: service.name,
      description: service.property,
      dimensions: service.property,
      currentQuantity: this.selectedItems.get(service.id) || PACKAGING_DEFAULT_QUANTITY,
    }).subscribe({
      next: (quantity) => {
        if (quantity) {
          this.selectedItems.set(service.id, quantity);
          this.emitChange();
        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  removePackage(id: string): void {
    this.selectedItems.delete(id);
    this.emitChange();
  }

  isSelected(id: string): boolean {
    return this.selectedItems.has(id);
  }

  getQuantity(id: string): number {
    return this.selectedItems.get(id) || PACKAGING_DEFAULT_QUANTITY;
  }

  private initializeGroups(): void {
    this.boxes = this.filterServices(PackagingId.BOXES);
    this.safePacks = this.filterServices(PackagingId.SAFE_PACKS);
    this.polyPacks = this.filterServices(PackagingId.POLY_PACKS);
    this.films = this.filterServices(PackagingId.FILMS);
    this.other = this.services.filter(
      (service) =>
        service.group_id === PackagingId.ROOT &&
        PackagingId.OTHER.includes(service.subgroup_id as OtherIds),
    );
  }

  private initializeSelectedItems() {
    if (this.data) {
      const { items } = this.data;

      this.selectedItems = this.createItemsMap(items);
    } else {
      this.selectedItems = new Map<string, number>();
    }
  }

  private createItemsMap(items: PackagingItem[]): Map<string, number> {
    return new Map(items.map((item) => [item.id, item.quantity]));
  }

  private filterServices(subgroupId: string): Service[] {
    return this.services.filter(
      (service) => service.group_id === PackagingId.ROOT && service.subgroup_id === subgroupId,
    );
  }

  private emitChange() {
    const items = Array.from(this.selectedItems.entries()).map(([id, quantity]) => ({
      id,
      quantity,
    }));

    this.dataChange.emit({ items });
  }
}
