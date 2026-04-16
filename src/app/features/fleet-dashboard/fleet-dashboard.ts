import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import the router module
import { FleetService } from '../../core/services/fleet.service';

@Component({
  selector: 'app-fleet-dashboard',
  standalone: true,
  // Added RouterModule here so the [routerLink] in your HTML works
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './fleet-dashboard.html',
  styleUrl: './fleet-dashboard.scss'
})
export class FleetDashboardComponent {
  private fleetService = inject(FleetService);

  // Link UI signals to the service
  vehicles = this.fleetService.filteredVehicles;
  activeFilter = this.fleetService.currentFilter;
  total = this.fleetService.totalVehicles;
  inTransit = this.fleetService.inTransitCount;
  fuelAvg = this.fleetService.avgFuel;
  history = this.fleetService.activityHistory;
  
  // Setup the form for new vehicle registration
  vehicleForm = new FormGroup({
    plateNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
    driverName: new FormControl('', [Validators.required]),
    fuelLevel: new FormControl(100, [Validators.min(0), Validators.max(100)])
  });

  // Handle live search input from the UI
  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fleetService.setSearchTerm(input.value);
  }

  // Add a new vehicle and reset the form
  addVehicle() {
    if (this.vehicleForm.valid) {
      this.fleetService.addVehicle({
        id: 'V' + Math.floor(Math.random() * 1000),
        plateNumber: this.vehicleForm.value.plateNumber!,
        driverName: this.vehicleForm.value.driverName!,
        status: 'Available',
        fuelLevel: this.vehicleForm.value.fuelLevel!,
        lastLocation: { lat: 0, lng: 0 }
      });
      this.vehicleForm.reset({ fuelLevel: 100 });
    }
  }

  // Change the fleet filter (Available, In Transit, etc.)
  changeFilter(filter: 'All' | 'Available' | 'In Transit' | 'Maintenance') {
    this.fleetService.setFilter(filter);
  }

  // Update status to Available when a delivery is done
  completeDelivery(id: string) {
    this.fleetService.updateStatus(id, 'Available');
  }

  // Toggle maintenance status for a vehicle
  toggleMaint(id: string) {
    this.fleetService.toggleMaintenance(id);
  }

  // Remove a vehicle from the fleet after confirmation
  removeVehicle(id: string) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.fleetService.deleteVehicle(id);
    }
  }
}