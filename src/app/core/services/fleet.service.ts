import { Injectable, signal, computed, effect } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';

// Blueprint for our activity history entries
export interface ActivityLog {
  id: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'danger';
}

@Injectable({ providedIn: 'root' })
export class FleetService {
  private STORAGE_KEY = 'shiftlogix_fleet';

  // State Management
  private vehiclesSignal = signal<Vehicle[]>(this.getInitialVehicles());
  private filterSignal = signal<'All' | 'Available' | 'In Transit' | 'Maintenance'>('All');
  private searchTermSignal = signal<string>(''); 
  private historySignal = signal<ActivityLog[]>([]); // New history state

  constructor() {
    // Automatic sync to browser storage whenever fleet data changes
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.vehiclesSignal()));
    });
  }

  // UI-ready streams
  public activityHistory = this.historySignal.asReadonly();

  public filteredVehicles = computed(() => {
    const s = this.filterSignal();
    const term = this.searchTermSignal().toLowerCase().trim();
    const v = this.vehiclesSignal();

    return v.filter(item => {
      const matchesStatus = s === 'All' || item.status === s;
      const matchesSearch = item.plateNumber.toLowerCase().includes(term) || 
                            item.driverName.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  });

  // KPI Calculations
  public currentFilter = this.filterSignal.asReadonly();
  public totalVehicles = computed(() => this.vehiclesSignal().length);
  public inTransitCount = computed(() => this.vehiclesSignal().filter(v => v.status === 'In Transit').length);
  
  public avgFuel = computed(() => {
    const v = this.vehiclesSignal();
    return v.length ? Math.round(v.reduce((acc, curr) => acc + curr.fuelLevel, 0) / v.length) : 0;
  });

  /**
   * Internal helper to record dashboard events.
   * Keeps only the latest 10 actions to prevent memory bloat.
   */
  private addLog(message: string, type: 'info' | 'success' | 'warning' | 'danger' = 'info') {
    const newEntry: ActivityLog = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      timestamp: new Date(),
      type
    };
    this.historySignal.update(logs => [newEntry, ...logs].slice(0, 10));
  }

  // --- Search & Filter Logic ---

  setSearchTerm(term: string) {
    this.searchTermSignal.set(term);
  }

  setFilter(filter: 'All' | 'Available' | 'In Transit' | 'Maintenance') {
    this.filterSignal.set(filter);
  }

  // --- Fleet Mutations (With Activity Logging) ---

  addVehicle(vehicle: Vehicle) {
    this.vehiclesSignal.update(all => [...all, vehicle]);
    this.addLog(`New vehicle registered: ${vehicle.plateNumber}`, 'success');
  }

  updateStatus(id: string, status: 'Available' | 'In Transit' | 'Maintenance') {
    this.vehiclesSignal.update(all => all.map(v => v.id === id ? { ...v, status } : v));
    this.addLog(`Vehicle ${id} marked as ${status}`, 'info');
  }

  deleteVehicle(id: string) {
    const vehicle = this.vehiclesSignal().find(v => v.id === id);
    this.vehiclesSignal.update(all => all.filter(v => v.id !== id));
    this.addLog(`Deleted ${vehicle?.plateNumber || id} from fleet`, 'danger');
  }
  
  toggleMaintenance(id: string) {
    this.vehiclesSignal.update(all => all.map(v => {
      if (v.id === id) {
        const isCurrentlyMaint = v.status === 'Maintenance';
        const next = isCurrentlyMaint ? 'Available' : 'Maintenance';
        
        // Log the transition specifically
        const logMsg = isCurrentlyMaint ? `Completed maintenance for ${v.plateNumber}` : `Sent ${v.plateNumber} to shop`;
        this.addLog(logMsg, isCurrentlyMaint ? 'success' : 'warning');
        
        return { ...v, status: next as any };
      }
      return v;
    }));
  }

  private getInitialVehicles(): Vehicle[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }
}