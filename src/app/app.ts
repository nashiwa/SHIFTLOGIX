import { Component } from '@angular/core';
import { FleetDashboardComponent } from './features/fleet-dashboard/fleet-dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FleetDashboardComponent], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'shiftlogix';
}