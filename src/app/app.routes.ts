import { Routes } from '@angular/router';
import { FleetDashboardComponent } from './features/fleet-dashboard/fleet-dashboard';

export const routes: Routes = [
  { 
    path: '', 
    component: FleetDashboardComponent 
  },
  { 
    path: 'vehicle/:id', 
    // Pointing directly to your 'vehicle-detail.ts' file
    loadComponent: () => import('./features/vehicle-detail/vehicle-detail')
      .then(m => m.VehicleDetailComponent) 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];