import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { FormControl } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';

import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  merge,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import type { Observable } from 'rxjs';

import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiAlertService, TuiError, TuiLoader } from '@taiga-ui/core';
import type { TuiConfirmData } from '@taiga-ui/kit';
import {
  TUI_CONFIRM,
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

import { fadeSlideAnimation } from '@core/animations';
import { DEBOUNCE_TIME } from '@core/constants';

import type { CitiesFilterSource, Office, PickupCity } from '@shared/types';
import { FormControlStatus } from '@shared/types';

import { CourierDetailsComponent } from '@delivery/base/courier-details';
import { deliveryPointFeature } from '@delivery/delivery-point/store';
import type { CourierDetails } from '@delivery/types';

import type { PickupPointControlValues, PickupPointForm, ResetConfig } from './pickup-point.types';
import type { PickupPointViewModel } from './store';
import { PickupPointActions, pickupPointFeature } from './store';
import { PickupPointTabType } from './types';

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
  animations: [fadeSlideAnimation],
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
  private readonly dialogs = inject(TuiResponsiveDialogService);

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
    this.setupFormState();
    this.syncFormWithStore();
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
        this.vm$.pipe(map((vm) => vm.cities.items)),
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
        map((cities) => cities.items.length > 0),
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
        map((vm) => vm.error),
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
      this.handleCityChanges(),
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
        map((vm) => vm.cities.selected),
        distinctUntilChanged(),
        tap((city) => this.patchFormControl('city', city)),
      ),
      this.vm$.pipe(
        map((vm) => vm.offices.selected),
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

  private setupFormState(): void {
    const formChanges$ = this.form.statusChanges.pipe(startWith(this.form.status));
    const tabChanges$ = this.vm$.pipe(
      map((vm) => vm.activeTab?.id),
      filter(Boolean),
    );

    combineLatest([formChanges$, tabChanges$])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(([, activeTabId]) => {
          const requiredControls = this.getRequiredControls(activeTabId);

          const hasPending = requiredControls.some((control) => control.pending);
          const hasDisabled = requiredControls.some((control) => control.disabled);

          let status;

          if (hasDisabled) {
            status = FormControlStatus.DISABLED;
          } else if (hasPending) {
            status = FormControlStatus.PENDING;
          } else {
            status = requiredControls.every((control) => control.valid)
              ? FormControlStatus.VALID
              : FormControlStatus.INVALID;
          }

          // const isValid = status === FormControlStatus.VALID;

          return { status };
        }),
        distinctUntilChanged((prev, curr) => prev.status === curr.status),
      )
      .subscribe(({ status }) => {
        console.log('this.form.touched', this.form.touched);

        return this.store.dispatch(
          PickupPointActions.setFormState({
            status,
            pristine: this.form.pristine,
            touched: this.form.touched,
            dirty: this.form.dirty,
          }),
        );
      });
  }

  private syncFormWithStore(): void {
    this.store
      .select(pickupPointFeature.selectFormState)
      .pipe(
        distinctUntilChanged(
          (prev, curr) =>
            prev.pristine === curr.pristine &&
            prev.touched === curr.touched &&
            prev.dirty === curr.dirty,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((formStatus) => {
        if (formStatus.pristine && !this.form.pristine) {
          this.form.markAsPristine();
        }
        if (!formStatus.touched && this.form.touched) {
          this.form.markAsUntouched();
        }
        if (!formStatus.dirty && this.form.dirty) {
          this.form.markAsPristine();
        }
      });
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

  private patchFormControl<K extends keyof PickupPointControlValues>(
    controlName: K,
    value: PickupPointControlValues[K],
  ): void {
    const control = this.form.controls[controlName] as FormControl<PickupPointControlValues[K]>;

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

  private handleCityChanges(): Observable<ReturnType<typeof PickupPointActions.selectCity>> {
    return this.city.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      withLatestFrom(
        this.vm$.pipe(map((vm) => vm.cities.selected)),
        this.store.select(deliveryPointFeature.selectFormState),
      ),
      switchMap(([newCity, currentCity, deliveryPointForm]) => {
        if (!deliveryPointForm.valid) {
          return of(PickupPointActions.selectCity({ city: newCity! }));
        }

        const confirmData: TuiConfirmData = {
          content: 'Информация о заказе будет удалена!',
          yes: 'Да',
          no: 'Нет',
        };

        return this.dialogs
          .open<boolean>(TUI_CONFIRM, {
            label: 'Вы уверены?',
            size: 's',
            data: confirmData,
          })
          .pipe(
            map((confirmed) => {
              if (!confirmed) {
                this.city.patchValue(currentCity, { emitEvent: false });
              }
              return PickupPointActions.selectCity({
                city: confirmed ? newCity! : currentCity!,
              });
            }),
          );
      }),
    );
  }
}
