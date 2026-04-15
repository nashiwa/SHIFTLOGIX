import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; // Import Forms
import { FleetService } from '../../core/services/fleet.service';

@Component({
  selector: 'app-fleet-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './fleet-dashboard.html',
  styleUrl: './fleet-dashboard.scss'
})
export class FleetDashboardComponent {
  private fleetService = inject(FleetService);
  
  public vehicles = this.fleetService.filteredVehicles;
  public activeFilter = this.fleetService.currentFilter;
  public total = this.fleetService.totalVehicles;
  public inTransit = this.fleetService.inTransitCount;
  public fuelAvg = this.fleetService.avgFuel;

  // Define your Form structure
  vehicleForm = new FormGroup({
    plateNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
    driverName: new FormControl('', [Validators.required]),
    fuelLevel: new FormControl(100, [Validators.min(0), Validators.max(100)])
  });

  addVehicle() {
    if (this.vehicleForm.valid) {
      const formValue = this.vehicleForm.value;
      
      const newVehicle: any = {
        id: 'V' + Math.floor(Math.random() * 1000),
        plateNumber: formValue.plateNumber,
        driverName: formValue.driverName,
        status: 'Available',
        fuelLevel: formValue.fuelLevel,
        lastLocation: { lat: 0, lng: 0 }
      };

      this.fleetService.addVehicle(newVehicle);
      this.vehicleForm.reset({ fuelLevel: 100 }); // Clear form after adding
    }
  }

  changeFilter(filter: 'All' | 'Available' | 'In Transit') {
    this.fleetService.setFilter(filter);
  }
  completeDelivery(id: string) {
    this.fleetService.updateStatus(id, 'Available');
  }
}