import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { TUI_DATE_VALUE_TRANSFORMER } from '@taiga-ui/kit';

import { CustomDateTransformer } from '@core/transformers';

import { DeliveryDetailsEffects } from '@features/delivery/delivery-details/store/effects';
import { deliveryDetailsFeature } from '@features/delivery/delivery-details/store/feature';
import {
  DeliveryPointEffects,
  deliveryPointFeature,
} from '@features/delivery/delivery-point/store';
import { PickupPointEffects, pickupPointFeature } from '@features/delivery/pickup-point/store';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(pickupPointFeature),
    provideState(deliveryPointFeature),
    provideState(deliveryDetailsFeature),
    provideEffects(PickupPointEffects, DeliveryPointEffects, DeliveryDetailsEffects),
    provideRouterStore(),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    NG_EVENT_PLUGINS,
    {
      provide: TUI_DATE_VALUE_TRANSFORMER,
      useClass: CustomDateTransformer,
    },
  ],
};
