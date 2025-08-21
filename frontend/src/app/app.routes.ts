import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'dispositivo-detalle/:id',
    loadComponent: () => import('./dispositivo-detalle/dispositivo-detalle.page').then(m => m.DispositivoDetallePage)
  },
  {
    path: 'mediciones-historial/:id',
    loadComponent: () => import('./mediciones-historial/mediciones-historial.page').then(m => m.MedicionesHistorialPage)
  },
];