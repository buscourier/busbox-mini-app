import { provideHttpClient } from '@angular/common/http';
import { type ApplicationConfig, signal } from '@angular/core';
import { isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { tuiButtonOptionsProvider, tuiTextfieldOptionsProvider } from '@taiga-ui/core';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import {
  TUI_DATE_VALUE_TRANSFORMER,
  tuiCheckboxOptionsProvider,
  tuiInputNumberOptionsProvider,
  tuiRadioOptionsProvider,
} from '@taiga-ui/kit';
import { TUI_TEXTFIELD_LABEL_OUTSIDE, TUI_TEXTFIELD_SIZE } from '@taiga-ui/legacy';

import { DEFAULT_VALIDATION_LIMITS, DEFAULT_VALIDATION_MESSAGES } from '@core/config';
import { VALIDATION_LIMITS, VALIDATION_MESSAGES } from '@core/tokens';
import { CustomDateTransformer } from '@core/transformers';

import { BookingEffects, bookingFeature } from '@delivery/booking';
import { DeliveryDetailsEffects, deliveryDetailsFeature } from '@delivery/delivery-details';
import { DeliveryPointEffects, deliveryPointFeature } from '@delivery/delivery-point';
import { DeliverySummaryEffects, deliverySummaryFeature } from '@delivery/delivery-summary';
import { PickupPointEffects, pickupPointFeature } from '@delivery/pickup-point';

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
    provideState(deliverySummaryFeature),
    provideState(bookingFeature),
    provideEffects(
      PickupPointEffects,
      DeliveryPointEffects,
      DeliveryDetailsEffects,
      DeliverySummaryEffects,
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
    {
      provide: VALIDATION_LIMITS,
      useValue: DEFAULT_VALIDATION_LIMITS,
    },
    {
      provide: VALIDATION_MESSAGES,
      useValue: DEFAULT_VALIDATION_MESSAGES,
    },
    {
      provide: TUI_TEXTFIELD_SIZE,
      useValue: {
        size: 'm',
      },
    },
    {
      provide: TUI_TEXTFIELD_LABEL_OUTSIDE,
      useValue: {
        labelOutside: true,
      },
    },
    // tuiDialogOptionsProvider()
    tuiRadioOptionsProvider({
      size: 'm',
    }),
    tuiButtonOptionsProvider({
      size: 'm',
    }),
    tuiCheckboxOptionsProvider({
      size: 'm',
    }),
    tuiTextfieldOptionsProvider({
      size: signal('m'),
      cleaner: signal(false),
    }),
    tuiInputNumberOptionsProvider({
      min: 0,
      max: 20,
    }),
  ],
};
