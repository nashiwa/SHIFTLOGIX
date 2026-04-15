import { Injectable, signal, computed } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class FleetService {
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

  // NEW: Tracks the active filter selection
  private filterSignal = signal<'All' | 'Available' | 'In Transit'>('All');

  // NEW: This is the smart list. It updates automatically when vehicles OR filter changes.
  public filteredVehicles = computed(() => {
    const vehicles = this.vehiclesSignal();
    const filter = this.filterSignal();

    if (filter === 'All') return vehicles;
    return vehicles.filter(v => v.status === filter);
  });

  // Expose the current filter as read-only so the UI can highlight the active button
  public currentFilter = this.filterSignal.asReadonly();

  // Stats (These still look at the WHOLE fleet)
  public vehicles = this.vehiclesSignal.asReadonly();
  public totalVehicles = computed(() => this.vehicles().length);
  
  public inTransitCount = computed(() => 
    this.vehicles().filter(v => v.status === 'In Transit').length
  );

  public avgFuel = computed(() => {
    if (this.totalVehicles() === 0) return 0;
    const total = this.vehicles().reduce((acc, v) => acc + v.fuelLevel, 0);
    return Math.round(total / this.totalVehicles());
  });

  // NEW: Method to update the filter
  setFilter(newFilter: 'All' | 'Available' | 'In Transit') {
    this.filterSignal.set(newFilter);
  }

  updateStatus(vehicleId: string, newStatus: 'Available' | 'In Transit' | 'Maintenance') {
    this.vehiclesSignal.update(vehicles => 
      vehicles.map(v => v.id === vehicleId ? { ...v, status: newStatus } : v)
    );
  }

  addVehicle(newVehicle: Vehicle) {
    this.vehiclesSignal.update(vehicles => [...vehicles, newVehicle]);
  }

  constructor() { }
}