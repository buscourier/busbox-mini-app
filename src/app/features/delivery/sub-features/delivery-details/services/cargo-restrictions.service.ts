import { Injectable } from '@angular/core';

import { DeliveryCity } from '@shared/types';

import { PARCEL_LIMITS, PARCELS_LIMITS, RESTRICTION_MESSAGES } from '@features/delivery/constants';
import {
  CargoItemRestrictions,
  CargoPointRestriction,
  CargoRestrictions,
  GetCargoRestrictionsParams,
  GetParcelLimitsParams,
  ParcelLimits,
  ParcelsLimits,
} from '@features/delivery/types';

@Injectable({
  providedIn: 'root',
})
export class CargoRestrictionsService {
  private readonly cityParcelsLimits = new Map<string, ParcelsLimits>();
  private readonly cityParcelLimits = new Map<string, ParcelLimits>();

  constructor() {
    this.cityParcelsLimits = this.initCityParcelsLimits();
    this.cityParcelLimits = this.initCityParcelLimits();
  }

  getRestrictions(params: GetCargoRestrictionsParams): CargoRestrictions {
    const isOfficeLimited = params.isStartPointOfficeLimited || params.isEndPointOfficeLimited;
    const isCourierLimited =
      params.isStartPointCourierTabActive || params.isEndPointCourierTabActive;

    return {
      autoParts: this.getCargoItemRestrictions(params),
      otherCargo: this.getCargoItemRestrictions(params),
      parcels: this.getParcelsLimits({
        deliveryCity: params.endCity,
        isOfficeLimited,
        isCourierLimited,
      }),
      parcel: this.getParcelLimits({
        deliveryCity: params.endCity,
        isOfficeLimited,
        isCourierLimited,
      }),
    };
  }

  private getParcelsLimits({
    deliveryCity,
    isOfficeLimited,
    isCourierLimited,
  }: GetParcelLimitsParams): ParcelsLimits {
    const cityParcelLimits = this.getCityParcelsLimits(deliveryCity);
    if (cityParcelLimits) return cityParcelLimits;

    if (isOfficeLimited) {
      return { ...PARCELS_LIMITS.OFFICE };
    }

    if (isCourierLimited) {
      return { ...PARCELS_LIMITS.COURIER };
    }

    return { ...PARCELS_LIMITS.DEFAULT };
  }

  private getParcelLimits({
    deliveryCity,
    isOfficeLimited,
    isCourierLimited,
  }: GetParcelLimitsParams): ParcelLimits {
    const limitsByCity = this.getCityParcelLimits(deliveryCity);
    if (limitsByCity) return limitsByCity;

    if (isOfficeLimited) {
      return { ...PARCEL_LIMITS.OFFICE };
    }

    if (isCourierLimited) {
      return { ...PARCEL_LIMITS.COURIER };
    }

    return { ...PARCEL_LIMITS.DEFAULT };
  }

  private initCityParcelsLimits(): Map<string, ParcelsLimits> {
    const map = new Map<string, ParcelsLimits>();

    PARCELS_LIMITS.CITY.forEach((limit, ids) => {
      ids.forEach((id) => {
        map.set(id, limit);
      });
    });

    return map;
  }

  private initCityParcelLimits(): Map<string, ParcelLimits> {
    const map = new Map<string, ParcelLimits>();

    PARCEL_LIMITS.CITY.forEach((limit, ids) => {
      ids.forEach((id) => {
        map.set(id, limit);
      });
    });

    return map;
  }

  private getCityParcelLimits(city: DeliveryCity | null): ParcelLimits | null {
    if (!city) return null;

    const limits = this.cityParcelLimits.get(city.id);
    if (!limits) return null;

    return limits;
  }

  private getCityParcelsLimits(city: DeliveryCity | null): ParcelsLimits | null {
    if (!city) return null;

    const limits = this.cityParcelsLimits.get(city.id);
    if (!limits) return null;

    return limits;
  }

  getCargoItemRestrictions(params: GetCargoRestrictionsParams): CargoItemRestrictions {
    return {
      startPointOffice: params.isStartPointOfficeLimited
        ? this.createCargoPointRestriction(RESTRICTION_MESSAGES.START_OFFICE)
        : null,
      endPointOffice: params.isEndPointOfficeLimited
        ? this.createCargoPointRestriction(RESTRICTION_MESSAGES.END_OFFICE)
        : null,
      startPointCourier: params.isStartPointCourierTabActive
        ? this.createCargoPointRestriction(RESTRICTION_MESSAGES.START_COURIER)
        : null,
      endPointCourier: params.isEndPointCourierTabActive
        ? this.createCargoPointRestriction(RESTRICTION_MESSAGES.END_COURIER)
        : null,
    };
  }

  createCargoPointRestriction(message: string): CargoPointRestriction {
    return {
      restricted: true,
      message,
    };
  }
}
