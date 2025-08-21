import { enableProdMode, importProvidersFrom } from '@angular/core'; // <-- Añadir importProvidersFrom
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

// Importar el módulo de gráficos
import { NgCircleProgressModule } from 'ng-circle-progress';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    // Añadir esta línea para la configuración global del módulo de gráficos
    importProvidersFrom(NgCircleProgressModule.forRoot({
      // Puedes dejar esto vacío o poner valores por defecto
    }))
  ],
});