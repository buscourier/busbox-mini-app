import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  merge,
  Observable,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { TuiAlertService, TuiError, TuiLoader } from '@taiga-ui/core';
import {
  TuiCheckbox,
  TuiDataListWrapper,
  TuiFieldErrorPipe,
  TuiStringifyContentPipe,
  TuiStringifyPipe,
} from '@taiga-ui/kit';
import { TuiComboBoxModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

import { DEBOUNCE_TIME } from '@core/constants';

import { CitiesFilterSource, DeliveryCity, Office } from '@shared/types';

import { CourierDetailsComponent } from '@features/delivery/base/courier-details';
import { CourierDetails } from '@features/delivery/types';

import { DeliveryPointActions, deliveryPointFeature, DeliveryPointViewModel } from './store';
import { ControlValues, DeliveryPointForm } from './types/form.types';
import { ResetConfig } from './types/reset-config.types';
import { DeliveryPointTabType } from './types/tab.types';

@Component({
  selector: 'app-delivery-point',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiLoader,
    TuiComboBoxModule,
    TuiStringifyPipe,
    TuiTextfieldControllerModule,
    TuiStringifyContentPipe,
    TuiDataListWrapper,
    TuiError,
    TuiFieldErrorPipe,
    TuiSelectModule,
    CourierDetailsComponent,
    TuiCheckbox,
  ],
  templateUrl: './delivery-point.component.html',
  styleUrl: './delivery-point.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryPointComponent implements OnInit {
  vm$!: Observable<DeliveryPointViewModel>;
  form!: DeliveryPointForm;
  cities$!: Observable<DeliveryCity[] | null>;
  protected readonly TabType = DeliveryPointTabType;

  private readonly alerts = inject(TuiAlertService);
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchQuery$ = new Subject<string | null>();

  get city(): FormControl<DeliveryCity | null> {
    return this.form.controls.city;
  }

  get office(): FormControl<Office | null> {
    return this.form.controls.office;
  }

  get courierDetails(): FormControl<CourierDetails | null> {
    return this.form.controls.courierDetails;
  }

  get busPickup(): FormControl<boolean> {
    return this.form.controls.busPickup;
  }

  ngOnInit(): void {
    this.vm$ = this.store.select(deliveryPointFeature.selectViewModel);
    this.store.dispatch(DeliveryPointActions.initState());

    this.initValues();
    this.initForm();
    this.setupFormSync();
    this.setupStoreSync();
    this.setupFormValidation();
    this.setupErrorHandling();
  }

  onSearchChange(searchQuery: string | null): void {
    this.searchQuery$.next(searchQuery);
  }

  onTabChange(activeTabId: DeliveryPointTabType): void {
    this.store.dispatch(DeliveryPointActions.setActiveTabId({ activeTabId }));
  }

  private initValues(): void {
    this.cities$ = this.filterCities(
      combineLatest([
        this.vm$.pipe(map((vm) => vm.cities)),
        this.searchQuery$.pipe(
          startWith(''),
          filter((searchQuery: string | null) => searchQuery !== null),
        ),
      ]),
    );
  }

  private initForm(): void {
    this.form = this.fb.group({
      city: this.fb.control<DeliveryCity | null>(null, [Validators.required]),
      office: this.fb.control<Office | null>(null, [Validators.required]),
      courierDetails: this.fb.control<CourierDetails | null>(null, [Validators.required]),
      busPickup: this.fb.control<boolean>(false, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.vm$
      .pipe(
        map((vm) => vm.cities),
        map((cities) => cities.length > 0),
        distinctUntilChanged(),
        tap((hasCities) =>
          hasCities
            ? this.city.enable({ emitEvent: false })
            : this.city.disable({ emitEvent: false }),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.setupTabChangeReset();
  }

  private setupErrorHandling(): void {
    this.vm$
      .pipe(
        map((vm) => vm.errorStatus),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((error) => {
        if (error.hasAnyError) {
          this.showErrorNotification('Не удалось загрузить данные по пункту доставки');
        }
      });
  }

  private setupTabChangeReset(): void {
    this.vm$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((vm) => vm.activeTab?.id),
        distinctUntilChanged(),
        filter(Boolean),
        map((tabId) => this.getResetConfig(tabId)),
      )
      .subscribe(({ controls, actions }) => {
        controls.forEach((control) => control.reset());
        actions.forEach((action) => this.store.dispatch(action));
      });
  }

  private setupFormSync(): void {
    const formChanges$ = merge(
      this.city.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        map((city) => DeliveryPointActions.selectCity({ city })),
      ),
      this.office.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        map((office) => DeliveryPointActions.selectOffice({ office })),
      ),
      this.courierDetails.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        map((courierDetails) => DeliveryPointActions.updateCourierDetails({ courierDetails })),
      ),
      this.busPickup.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        map((enabled) => DeliveryPointActions.setBusPickup({ enabled })),
      ),
    );

    formChanges$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => this.store.dispatch(action));
  }

  private setupStoreSync(): void {
    merge(
      this.vm$.pipe(
        map((vm) => vm.selectionStatus.selectedCity),
        distinctUntilChanged(),
        tap((city) => this.patchFormControl('city', city)),
      ),
      this.vm$.pipe(
        map((vm) => vm.selectionStatus.selectedOffice),
        distinctUntilChanged(),
        tap((office) => this.patchFormControl('office', office)),
      ),
      this.vm$.pipe(
        map((vm) => vm.courierDetails),
        distinctUntilChanged(),
        tap((courierDetails) => this.patchFormControl('courierDetails', courierDetails)),
      ),
      this.vm$.pipe(
        map((vm) => vm.busPickup),
        distinctUntilChanged(),
        tap((enabled) => this.patchFormControl('busPickup', enabled)),
      ),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private setupFormValidation(): void {
    const formChanges$ = this.form.statusChanges.pipe(startWith(this.form.status));
    const tabChanges$ = this.vm$.pipe(
      map((vm) => vm.activeTab?.id),
      filter(Boolean),
    );

    combineLatest([formChanges$, tabChanges$])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(([, activeTabId]) => this.getRequiredControls(activeTabId)),
        map((controls) => controls.every((control) => control.valid)),
        distinctUntilChanged(),
      )
      .subscribe((isValid) =>
        this.store.dispatch(DeliveryPointActions.setFormValidity({ isValid })),
      );
  }

  private filterCities(
    source$: Observable<CitiesFilterSource<DeliveryCity>>,
  ): Observable<DeliveryCity[]> {
    return source$.pipe(
      debounceTime(DEBOUNCE_TIME.DEFAULT),
      map(([cities, searchQuery]) =>
        cities.filter((city) => city.name.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    );
  }

  private getRequiredControls(activeTabId: DeliveryPointTabType | null): FormControl[] {
    const tabControl =
      activeTabId === DeliveryPointTabType.OFFICE
        ? this.office
        : activeTabId === DeliveryPointTabType.BUS
          ? this.busPickup
          : this.courierDetails;

    return [this.city, tabControl];
  }

  private patchFormControl<K extends keyof ControlValues>(
    controlName: K,
    value: ControlValues[K],
  ): void {
    const control = this.form.controls[controlName] as FormControl<ControlValues[K]>;

    if (control.value !== value) {
      control.patchValue(value, { emitEvent: false });
    }
  }

  private getResetConfig(tabId: DeliveryPointTabType): ResetConfig {
    switch (tabId) {
      case DeliveryPointTabType.OFFICE:
        return {
          controls: [this.courierDetails, this.busPickup],
          actions: [
            DeliveryPointActions.resetCourierDetails(),
            DeliveryPointActions.setBusPickup({ enabled: false }),
          ],
        };
      case DeliveryPointTabType.COURIER:
        return {
          controls: [this.office, this.busPickup],
          actions: [
            DeliveryPointActions.resetOffice(),
            DeliveryPointActions.setBusPickup({ enabled: false }),
          ],
        };
      case DeliveryPointTabType.BUS:
        return {
          controls: [this.courierDetails, this.office],
          actions: [
            DeliveryPointActions.resetCourierDetails(),
            DeliveryPointActions.resetOffice(),
            DeliveryPointActions.setBusPickup({ enabled: true }),
          ],
        };
      default:
        throw new Error(`Unexpected tab type: ${tabId}`);
    }
  }

  private showErrorNotification(message: string): void {
    this.alerts
      .open(message, {
        label: 'Ошибка',
        autoClose: 0,
        appearance: 'error',
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
