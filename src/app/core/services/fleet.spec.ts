import { Injectable, signal } from '@angular/core';
import { Vehicle } from '../models/vehicle.model'; // This links to your Step 1 file

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  // We use a Signal to hold our array of Vehicles. 
  // This is the "Source of Truth" for your whole logistics app.
  private vehiclesSignal = signal<Vehicle[]>([
    {
      id: 'V101',
      plateNumber: 'LDN-5521',
      driverName: 'Alex Thompson',
      status: 'In Transit',
      fuelLevel: 82,
      lastLocation: { lat: 51.5074, lng: -0.1278 }
    },
    {
      id: 'V102',
      plateNumber: 'MAN-9900',
      driverName: 'Sarah Jenkins',
      status: 'Available',
      fuelLevel: 45,
      lastLocation: { lat: 53.4808, lng: -2.2426 }
    }
  ]);

  // We expose the list as a Read-Only signal so components can see it but not mess it up
  public vehicles = this.vehiclesSignal.asReadonly();

  constructor() { }
}