import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="detail-container">
      <header>
        <button routerLink="/" class="back-btn">⬅ Back to Fleet</button>
        <h1>Vehicle Deep-Dive</h1>
      </header>

      <div class="detail-card">
        <h2>Unit ID: {{ vehicleId }}</h2>
        <p class="status-msg">Fetching real-time telematics data...</p>
        
        <div class="placeholder-stats">
          <div class="stat">Location: <span class="data">Tracking...</span></div>
          <div class="stat">Engine Status: <span class="data">Diagnostic in progress</span></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container { padding: 40px; max-width: 800px; margin: 0 auto; font-family: sans-serif; }
    .back-btn { background: #f8f9fa; border: 1px solid #ddd; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-bottom: 20px; }
    .back-btn:hover { background: #e2e6ea; }
    .detail-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 5px solid #3498db; }
    .status-msg { color: #666; font-style: italic; }
    .placeholder-stats { margin-top: 20px; display: grid; gap: 10px; }
    .data { font-weight: bold; color: #3498db; }
  `]
})
export class VehicleDetailComponent {
  private route = inject(ActivatedRoute);
  
  // This grabs the 'id' from the URL (e.g., /vehicle/V123)
  vehicleId = this.route.snapshot.paramMap.get('id');
}