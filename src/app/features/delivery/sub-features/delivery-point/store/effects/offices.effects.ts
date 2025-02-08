import { inject } from '@angular/core';

import { filter, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom, mapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';

import { ApiError, Office } from '@shared/types';

import { DeliveryService } from '@features/delivery/services';

import { DeliveryPointTabType } from '../../types';

import { DeliveryPointActions } from '../actions';
import { deliveryPointFeature } from '../feature';

export const officesEffects = {
  initOfficesLoad: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.loadCitiesSuccess),
        map(() => DeliveryPointActions.loadOffices()),
      );
    },
    { functional: true },
  ),
  loadOffices: createEffect(
    (actions$ = inject(Actions), deliveryService = inject(DeliveryService)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.loadOffices),
        switchMap(() =>
          deliveryService.getOffices().pipe(
            mapResponse({
              next: (offices: Office[]) => DeliveryPointActions.loadOfficesSuccess({ offices }),
              error: (error: ApiError) => DeliveryPointActions.loadOfficesFailure({ error }),
            }),
          ),
        ),
      );
    },
    { functional: true },
  ),
  selectDefaultOffice: createEffect(
    (actions$ = inject(Actions), store = inject(Store)) => {
      return actions$.pipe(
        ofType(DeliveryPointActions.setActiveTabId),
        concatLatestFrom(() => [
          store.select(deliveryPointFeature.selectAvailableOffices),
          store.select(deliveryPointFeature.selectSelectedOffice),
        ]),
        filter(([{ activeTabId }, offices, selectedOffice]) => {
          const isOfficeTab = activeTabId === DeliveryPointTabType.OFFICE;
          const hasOffices = offices.length > 0;
          const noSelectedOffice = !selectedOffice;

          return isOfficeTab && hasOffices && noSelectedOffice;
        }),
        map(([, offices]) => DeliveryPointActions.selectOffice({ office: offices[0] })),
      );
    },
    { functional: true },
  ),
};
