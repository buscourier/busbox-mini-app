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

import { Packaging, PackagingItem, Service } from '../../types';

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
  @Input({ required: true }) options!: Service[];
  @Input() data: Packaging | null = null;
  @Output() dataChange = new EventEmitter<Packaging>();
  @Output() validationChange = new EventEmitter<boolean>();

  boxes: Service[] = [];
  safePacks: Service[] = [];
  polyPacks: Service[] = [];
  films: Service[] = [];
  other: Service[] = [];

  selectedPackages = new Map<string, number>();

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
      this.initializeSelectedPackages();
    }
  }

  selectPackage(option: Service): void {
    this.dialog({
      title: option.name,
      description: option.property,
      dimensions: option.property,
      currentQuantity: this.selectedPackages.get(option.id) || PACKAGING_DEFAULT_QUANTITY,
    }).subscribe({
      next: (quantity) => {
        if (quantity) {
          this.selectedPackages.set(option.id, quantity);
          this.emitChange();
        }
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  removePackage(id: string): void {
    this.selectedPackages.delete(id);
    this.emitChange();
  }

  isSelected(id: string): boolean {
    return this.selectedPackages.has(id);
  }

  getQuantity(id: string): number {
    return this.selectedPackages.get(id) || PACKAGING_DEFAULT_QUANTITY;
  }

  private initializeGroups(): void {
    this.boxes = this.filterOptions(PackagingId.BOXES);
    this.safePacks = this.filterOptions(PackagingId.SAFE_PACKS);
    this.polyPacks = this.filterOptions(PackagingId.POLY_PACKS);
    this.films = this.filterOptions(PackagingId.FILMS);
    this.other = this.options.filter((option) =>
      PackagingId.OTHER.includes(option.subgroup_id as OtherIds),
    );
  }

  private initializeSelectedPackages() {
    if (this.data) {
      const { items } = this.data;

      this.selectedPackages = this.createItemsMap(items);
    } else {
      this.selectedPackages = new Map<string, number>();
    }
  }

  private createItemsMap(items: PackagingItem[]): Map<string, number> {
    return new Map(items.map((item) => [item.id, item.quantity]));
  }

  private filterOptions(subgroupId: string): Service[] {
    return this.options.filter((option) => option.subgroup_id === subgroupId);
  }

  private emitChange() {
    const items = Array.from(this.selectedPackages.entries()).map(([id, quantity]) => ({
      id,
      quantity,
    }));

    this.dataChange.emit({ items });
  }
}
