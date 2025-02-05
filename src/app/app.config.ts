import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { CustomDateTransformer } from '@core/transformers';
import { TUI_DATE_VALUE_TRANSFORMER } from '@taiga-ui/kit';
import { PickupPointEffects, pickupPointFeature } from '@delivery/foundation/pickup-point/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(pickupPointFeature),
    provideEffects(PickupPointEffects),
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
