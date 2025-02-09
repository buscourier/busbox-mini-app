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
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { filter } from 'rxjs';

import { TuiBooleanHandler } from '@taiga-ui/cdk';
import { TuiAlertService, TuiHintDirective, TuiTitle } from '@taiga-ui/core';
import { TuiBadge, TuiRadioList } from '@taiga-ui/kit';

import { Cargo, CargoRestrictions, CargoType, CargoTypeId, MappedCargoType } from '../../types';

@Component({
  selector: 'app-cargo-picker',
  imports: [TuiRadioList, ReactiveFormsModule, TuiHintDirective, TuiBadge, TuiTitle],
  templateUrl: './cargo-picker.component.html',
  styleUrl: './cargo-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoPickerComponent implements OnInit, OnChanges {
  @Input({ required: true }) types!: Cargo[];
  @Input() activeType: CargoType | null = null;
  @Input() restrictions: CargoRestrictions | null = null;
  @Output() typeChange = new EventEmitter<CargoType>();

  typeControl = new FormControl<MappedCargoType | null>(null);
  mappedTypes: MappedCargoType[] = [];

  private readonly alerts = inject(TuiAlertService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.setupTypeChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleTypesChange(changes);
    this.handleActiveTypeChange(changes);
    this.handleRestrictionsChange(changes);
  }

  identityMatcher = (a: MappedCargoType | null, b: MappedCargoType | null): boolean => {
    if (!a || !b) return false;
    return a.value === b.value;
  };

  hasRestriction(data: MappedCargoType): boolean {
    if (!this.restrictions) return false;
    if (!this.isRestrictedType(data.value)) return false;

    return !!(
      this.restrictions.autoParts?.startPointCourier ||
      this.restrictions.autoParts?.endPointCourier ||
      this.restrictions.autoParts?.startPointOffice ||
      this.restrictions.autoParts?.endPointOffice ||
      this.restrictions.otherCargo?.startPointCourier ||
      this.restrictions.otherCargo?.endPointCourier ||
      this.restrictions.otherCargo?.startPointOffice ||
      this.restrictions.otherCargo?.endPointOffice
    );
  }

  getRestrictionMessage(data: MappedCargoType): string | null {
    if (!this.hasRestriction(data)) return null;

    return (
      this.restrictions?.autoParts?.startPointCourier?.message ||
      this.restrictions?.autoParts?.endPointCourier?.message ||
      this.restrictions?.autoParts?.startPointOffice?.message ||
      this.restrictions?.autoParts?.endPointOffice?.message ||
      this.restrictions?.otherCargo?.startPointCourier?.message ||
      this.restrictions?.otherCargo?.endPointCourier?.message ||
      this.restrictions?.otherCargo?.startPointOffice?.message ||
      this.restrictions?.otherCargo?.endPointOffice?.message ||
      null
    );
  }

  protected showNotification(): void {
    this.alerts
      .open(this.getNotificationMessage(this.typeControl.value?.name || ''), {
        label: 'Ограничение',
        autoClose: 0,
        appearance: 'warning',
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  protected readonly disabledHandler: TuiBooleanHandler<MappedCargoType> = (item) => {
    return this.hasRestriction(item);
  };

  private setupTypeChanges(): void {
    this.typeControl.valueChanges
      .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.typeChange.emit(value.value));
  }

  private handleTypesChange(changes: SimpleChanges): void {
    if (changes['types'] && changes['types'].firstChange) {
      this.mappedTypes = this.mapCargoTypes(this.types);
    }
  }

  private handleActiveTypeChange(changes: SimpleChanges): void {
    if (!changes['activeType'] || !this.mappedTypes.length) return;

    if (this.activeType) {
      this.setActiveType();
    } else {
      this.setDefaultType();
    }
  }

  private handleRestrictionsChange(changes: SimpleChanges): void {
    if (!changes['restrictions'] || !this.typeControl.value) return;

    const hasRestrictions = this.hasRestriction(this.typeControl.value);

    if (hasRestrictions && this.isRestrictedType(this.activeType)) {
      this.showNotification();
      this.typeChange.emit(CargoType.DOCUMENTS);
    }
  }

  private setActiveType(): void {
    const initialValue = this.mappedTypes.find((type) => type.value === this.activeType);
    if (initialValue) {
      this.typeControl.setValue(initialValue, { emitEvent: false });
    }
  }

  private setDefaultType(): void {
    const defaultValue = this.mappedTypes[0];

    if (defaultValue) {
      this.typeControl.setValue(defaultValue, { emitEvent: false });
      this.typeChange.emit(defaultValue.value);
    }
  }

  private isRestrictedType(type: CargoType | null): boolean {
    return type === CargoType.AUTO_PARTS || type === CargoType.OTHER;
  }

  private mapCargoTypes(types: Cargo[]): MappedCargoType[] {
    return types.map((type) => {
      switch (type.id) {
        case CargoTypeId.DOCUMENTS:
          return { value: CargoType.DOCUMENTS, name: 'Документы' };
        case CargoTypeId.PARCELS:
          return { value: CargoType.PARCELS, name: 'Посылки' };
        case CargoTypeId.AUTO_PARTS:
          return { value: CargoType.AUTO_PARTS, name: 'Автозапчасти' };
        case CargoTypeId.OTHER:
          return { value: CargoType.OTHER, name: 'Другое' };
        default:
          return { value: CargoType.DOCUMENTS, name: 'Документы' };
      }
    });
  }

  private getNotificationMessage(cargoName: string) {
    return `К сожалению тип груза <strong>${cargoName}</strong> недоступен при курьерской доставке.
          Переключено на <strong>Документы</strong>`;
  }
}
