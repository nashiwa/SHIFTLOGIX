import { Injectable, signal, computed, effect } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class FleetService {
  private STORAGE_KEY = 'shiftlogix_fleet';

  // 1. Core Signals
  private vehiclesSignal = signal<Vehicle[]>(this.getInitialVehicles());
  private filterSignal = signal<'All' | 'Available' | 'In Transit' | 'Maintenance'>('All');

  constructor() {
    // 2. The Auto-Save Effect
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.vehiclesSignal()));
    });
  }

  // 3. Computed Signals (Data Selectors)
  public filteredVehicles = computed(() => {
    const f = this.filterSignal();
    const v = this.vehiclesSignal();
    return f === 'All' ? v : v.filter(item => item.status === f);
  });

  public currentFilter = this.filterSignal.asReadonly();
  public totalVehicles = computed(() => this.vehiclesSignal().length);
  public inTransitCount = computed(() => this.vehiclesSignal().filter(v => v.status === 'In Transit').length);
  
  public avgFuel = computed(() => {
    const v = this.vehiclesSignal();
    return v.length ? Math.round(v.reduce((acc, curr) => acc + curr.fuelLevel, 0) / v.length) : 0;
  });

  // 4. Methods to Change Data
  setFilter(filter: 'All' | 'Available' | 'In Transit' | 'Maintenance') {
    this.filterSignal.set(filter);
  }

  addVehicle(vehicle: Vehicle) {
    this.vehiclesSignal.update(all => [...all, vehicle]);
  }

  updateStatus(id: string, status: 'Available' | 'In Transit' | 'Maintenance') {
    this.vehiclesSignal.update(all => all.map(v => v.id === id ? { ...v, status } : v));
  }

  toggleMaintenance(id: string) {
    this.vehiclesSignal.update(all => all.map(v => {
      if (v.id === id) {
        const nextStatus = v.status === 'Maintenance' ? 'Available' : 'Maintenance';
        return { ...v, status: nextStatus as any };
      }
      return v;
    }));
  }

  deleteVehicle(id: string) {
    this.vehiclesSignal.update(all => all.filter(v => v.id !== id));
  }

  // 5. Initial Loader
  private getInitialVehicles(): Vehicle[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { id: 'V101', plateNumber: 'LDN-5521', driverName: 'Alex Thompson', status: 'In Transit', fuelLevel: 82, lastLocation: { lat: 0, lng: 0 } },
      { id: 'V102', plateNumber: 'MAN-9900', driverName: 'Sarah Jenkins', status: 'Available', fuelLevel: 45, lastLocation: { lat: 0, lng: 0 } }
    ];
  }
}