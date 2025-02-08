import { animate, style, transition, trigger } from '@angular/animations';
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

import { TuiDay } from '@taiga-ui/cdk';
import { TuiAlertService, TuiError, TuiLoader } from '@taiga-ui/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiDataListWrapper,
  TuiFieldErrorPipe,
  TuiStringifyContentPipe,
  TuiStringifyPipe,
} from '@taiga-ui/kit';
import {
  TuiComboBoxModule,
  TuiInputDateModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
  TuiUnfinishedValidator,
} from '@taiga-ui/legacy';

import { DEBOUNCE_TIME } from '@core/constants';

import { CitiesFilterSource, Office, PickupCity } from '@shared/types';

import { CourierDetailsComponent } from '@features/delivery/base/courier-details';
import { CourierDetails } from '@features/delivery/types';

import { PickupPointActions, pickupPointFeature, PickupPointViewModel } from './store';
import { ControlValues, PickupPointForm, PickupPointTabType, ResetConfig } from './types';

@Component({
  selector: 'app-pickup-point',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiLoader,
    TuiComboBoxModule,
    TuiTextfieldControllerModule,
    TuiStringifyPipe,
    TuiDataListWrapper,
    TuiStringifyContentPipe,
    TuiError,
    TuiFieldErrorPipe,
    TuiSelectModule,
    CourierDetailsComponent,
    TuiInputDateModule,
    TuiUnfinishedValidator,
  ],
  templateUrl: './pickup-point.component.html',
  styleUrl: './pickup-point.component.css',
  animations: [
    trigger('tabContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Поле обязательно для заполнения`,
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickupPointComponent implements OnInit {
  vm$!: Observable<PickupPointViewModel>;
  form!: PickupPointForm;
  cities$!: Observable<PickupCity[] | null>;
  protected readonly TabType = PickupPointTabType;

  private readonly alerts = inject(TuiAlertService);
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchCity$ = new Subject<string | null>();

  get city(): FormControl<PickupCity | null> {
    return this.form.controls.city;
  }

  get office(): FormControl<Office | null> {
    return this.form.controls.office;
  }

  get courierPoint(): FormControl<CourierDetails | null> {
    return this.form.controls.courierPoint;
  }

  get departureDate(): FormControl<string | null> {
    return this.form.controls.departureDate;
  }

  get minDate(): TuiDay {
    return TuiDay.currentLocal();
  }

  ngOnInit(): void {
    this.vm$ = this.store.select(pickupPointFeature.selectViewModel);
    this.store.dispatch(PickupPointActions.initState());

    this.initValues();
    this.initForm();
    this.setupFormSync();
    this.setupStoreSync();
    this.setupFormValidation();
    this.setupErrorHandling();
  }

  onSearchChange(searchQuery: string | null): void {
    this.searchCity$.next(searchQuery);
  }

  onTabChange(activeTabId: PickupPointTabType): void {
    this.store.dispatch(PickupPointActions.setActiveTabId({ activeTabId }));
  }

  private initValues(): void {
    this.cities$ = this.filterCities(
      combineLatest([
        this.vm$.pipe(map((vm) => vm.cities)),
        this.searchCity$.pipe(
          startWith(''),
          filter((searchQuery: string | null) => searchQuery !== null),
        ),
      ]),
    );
  }

  private initForm(): void {
    this.form = this.fb.group({
      city: this.fb.control<PickupCity | null>(null, [Validators.required]),
      office: this.fb.control<Office | null>(null, Validators.required),
      courierPoint: this.fb.control<CourierDetails | null>(null, Validators.required),
      departureDate: this.fb.control<string | null>(null, Validators.required),
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
          this.showErrorNotification('Не удалось загрузить данные по пункту отправки');
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
      .subscribe(({ control, action }) => {
        control.reset();

        this.store.dispatch(action);
      });
  }

  private setupFormSync(): void {
    const formChanges$ = merge(
      this.city.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        map((city) => PickupPointActions.selectCity({ city })),
      ),
      this.office.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        map((office) => PickupPointActions.selectOffice({ office })),
      ),
      this.courierPoint.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        map((courierDetails) => PickupPointActions.updateCourierDetails({ courierDetails })),
      ),
      this.departureDate.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        map((departureDate) => PickupPointActions.setDepartureDate({ departureDate })),
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
        tap((courierPoint) => this.patchFormControl('courierPoint', courierPoint)),
      ),
      this.vm$.pipe(
        map((vm) => vm.departureDate),
        distinctUntilChanged(),
        tap((date) => this.patchFormControl('departureDate', date)),
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
      .subscribe((isValid) => this.store.dispatch(PickupPointActions.setFormValidity({ isValid })));
  }

  private filterCities(
    source$: Observable<CitiesFilterSource<PickupCity>>,
  ): Observable<PickupCity[]> {
    return source$.pipe(
      debounceTime(DEBOUNCE_TIME.DEFAULT),
      map(([cities, searchQuery]) =>
        cities.filter((city) => city.name.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    );
  }

  private getRequiredControls(activeTabId: PickupPointTabType | null): FormControl[] {
    const baseControls = [this.city, this.departureDate];
    const tabControl = activeTabId === PickupPointTabType.OFFICE ? this.office : this.courierPoint;

    return [...baseControls, tabControl];
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

  private getResetConfig(tabId: PickupPointTabType): ResetConfig {
    switch (tabId) {
      case PickupPointTabType.OFFICE:
        return {
          control: this.courierPoint,
          action: PickupPointActions.resetCourierDetails(),
        };
      case PickupPointTabType.COURIER:
        return {
          control: this.office,
          action: PickupPointActions.resetOffice(),
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
