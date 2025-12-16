import { Routes } from '@angular/router';
import { DashboardEjecucionComponent } from './dashboard/dashboard-ejecucion/dashboard-ejecucion.component';
import { DashboardGrafanaComponent } from './dashboard/dashboard-grafana/dashboard-grafana.component';
import { HomeComponent } from './home/home.component';

// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Inicio' }
  },
  {
    path: 'dashboard',
    component: DashboardGrafanaComponent,
    data: { breadcrumb: 'Dashboard' }
  },
  {
    path: 'ejecucion',
    component: DashboardEjecucionComponent,
    data: { breadcrumb: 'Ejecución de Pruebas' }
  },
  {
    path: 'detalle/:equipo',
    loadComponent: () =>
      import('./dashboard/detalle-calificacion/detalle-calificacion.component')
        .then(c => c.DetalleCalificacionComponent),
    data: { breadcrumb: 'Detalle' }
  },
  { path: '**', redirectTo: '' }
];
