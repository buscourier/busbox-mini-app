import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, type Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';

import type { FormControlStatus, Office, PickupCity } from '@shared/types';

import type { CourierDetails } from '@delivery/types';

import { PickupPointActions } from './store/actions';
import { pickupPointFeature } from './store/feature';
import type { PickupPointViewModel } from './store/selectors';
import type { PickupPointTabType } from './types';

@Injectable({
  providedIn: 'root',
})
export class PickupPointFacade {
  private readonly store = inject(Store);

  init(): void {
    this.store.dispatch(PickupPointActions.initState());
  }

  /**
   * Загружает список городов отправления
   */
  loadCities(): void {
    this.store.dispatch(PickupPointActions.loadCities());
  }

  getViewModel(): Observable<PickupPointViewModel> {
    return this.store.select(pickupPointFeature.selectViewModel);
  }

  getSelectedCity(): Observable<PickupCity | null> {
    return this.store.select(pickupPointFeature.selectSelectedCity);
  }

  getSelectedOffice(): Observable<Office | null> {
    return this.store.select(pickupPointFeature.selectSelectedOffice);
  }

  /**
   * Получает детали курьера (если выбран)
   */
  getCourierDetails(): Observable<CourierDetails | null> {
    return this.store.select(pickupPointFeature.selectCourierDetails);
  }

  getDepartureDate(): Observable<string | null> {
    return this.store.select(pickupPointFeature.selectDepartureDate);
  }

  /**
   * Проверяет, является ли форма валидной
   */
  // isFormValid(): Observable<boolean> {
  //   return this.store
  //     .select(pickupPointFeature.selectFormState)
  //     .pipe(map((formState) => formState.status === FormControlStatus.VALID));
  // }

  getAvailableOffices(): Observable<Office[]> {
    return this.store.select(pickupPointFeature.selectAvailableOffices);
  }

  /**
   * Получает текущий активный таб
   */
  getActiveTab(): Observable<PickupPointTabType | null> {
    return this.store.select(pickupPointFeature.selectActiveTabId);
  }

  /**
   * Получает список всех табов
   */
  getTabs(): Observable<unknown[]> {
    return this.store.select(pickupPointFeature.selectTabs);
  }

  selectCity(city: PickupCity): unknown {
    return this.store.dispatch(PickupPointActions.selectCity({ city }));
  }

  selectOffice(office: Office): void {
    this.store.dispatch(PickupPointActions.selectOffice({ office }));
  }

  updateCourierDetails(courierDetails: CourierDetails): void {
    this.store.dispatch(PickupPointActions.updateCourierDetails({ courierDetails }));
  }

  setDepartureDate(departureDate: string): void {
    this.store.dispatch(PickupPointActions.setDepartureDate({ departureDate }));
  }

  setActiveTab(activeTabId: PickupPointTabType): void {
    this.store.dispatch(PickupPointActions.setActiveTabId({ activeTabId }));
  }

  setFormState(
    status: FormControlStatus,
    pristine: boolean,
    touched: boolean,
    dirty: boolean,
  ): void {
    this.store.dispatch(
      PickupPointActions.setFormState({
        status,
        pristine,
        touched,
        dirty,
      }),
    );
  }

  reset(keepCity = false, city?: PickupCity): void {
    this.store.dispatch(PickupPointActions.resetState({ keepCity, city }));
  }

  resetOffice(): void {
    this.store.dispatch(PickupPointActions.resetOffice());
  }

  resetCourierDetails(): void {
    this.store.dispatch(PickupPointActions.resetCourierDetails());
  }

  /**
   * Получает данные для сохранения в представлении обзора
   */
  getReviewData(): Observable<unknown> {
    return this.getViewModel().pipe(
      take(1),
      filter((vm) => !!vm.cities.selected),
      map((vm) => {
        const city = vm.cities.selected;
        const office = vm.offices.selected;
        const courierDetails = vm.courierDetails;
        const date = vm.departureDate;
        const activeTabType = vm.activeTab?.id;

        return {
          city,
          office,
          courierDetails,
          date,
          deliveryMethod: activeTabType,
        };
      }),
    );
  }
}
