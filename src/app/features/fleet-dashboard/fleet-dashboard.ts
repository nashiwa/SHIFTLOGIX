import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FleetService } from '../../core/services/fleet.service';

@Component({
  selector: 'app-fleet-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fleet-dashboard.html',
  styleUrl: './fleet-dashboard.scss'
})
export class FleetDashboardComponent {
  private fleetService = inject(FleetService);

  vehicles = this.fleetService.filteredVehicles;
  activeFilter = this.fleetService.currentFilter;
  total = this.fleetService.totalVehicles;
  inTransit = this.fleetService.inTransitCount;
  fuelAvg = this.fleetService.avgFuel;

  vehicleForm = new FormGroup({
    plateNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
    driverName: new FormControl('', [Validators.required]),
    fuelLevel: new FormControl(100, [Validators.min(0), Validators.max(100)])
  });

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

  changeFilter(filter: 'All' | 'Available' | 'In Transit' | 'Maintenance') {
  this.fleetService.setFilter(filter);
}
  completeDelivery(id: string) { this.fleetService.updateStatus(id, 'Available'); }
  toggleMaint(id: string) { this.fleetService.toggleMaintenance(id); }
  removeVehicle(id: string) { if(confirm('Are you sure you want to delete this vehicle?')) this.fleetService.deleteVehicle(id); }
}