import { DeliveryCity } from '@shared/types';

export interface GetCargoRestrictionsParams {
  endCity: DeliveryCity | null;
  isStartPointOfficeLimited: boolean;
  isEndPointOfficeLimited: boolean;
  isStartPointCourierTabActive: boolean;
  isEndPointCourierTabActive: boolean;
}

export interface CargoPointRestriction {
  restricted: boolean;
  message: string;
}

export interface CargoItemRestrictions {
  startPointOffice: CargoPointRestriction | null;
  endPointOffice: CargoPointRestriction | null;
  startPointCourier: CargoPointRestriction | null;
  endPointCourier: CargoPointRestriction | null;
}
