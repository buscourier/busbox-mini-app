import { provideHttpClient } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { TUI_DATE_VALUE_TRANSFORMER } from '@taiga-ui/kit';

import { CustomDateTransformer } from '@core/transformers';

import { BookingEffects } from '@delivery/booking/store/effects';
import { bookingFeature } from '@delivery/booking/store/feature';
import { DeliveryDetailsEffects } from '@delivery/delivery-details/store/effects';
import { deliveryDetailsFeature } from '@delivery/delivery-details/store/feature';
import { DeliveryPointEffects } from '@delivery/delivery-point/store/effects';
import { deliveryPointFeature } from '@delivery/delivery-point/store/feature';
import { OrderSummaryEffects } from '@delivery/order-summary/store/effects';
import { orderSummaryFeature } from '@delivery/order-summary/store/feature';
import { PickupPointEffects } from '@delivery/pickup-point/store/effects';
import { pickupPointFeature } from '@delivery/pickup-point/store/feature';
import { DeliveryEffects } from '@delivery/store/effects';

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
    provideState(orderSummaryFeature),
    provideState(bookingFeature),
    provideEffects(
      DeliveryEffects,
      PickupPointEffects,
      DeliveryPointEffects,
      DeliveryDetailsEffects,
      OrderSummaryEffects,
      BookingEffects,
    ),
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
