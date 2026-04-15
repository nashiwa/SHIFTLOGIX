import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetDashboardComponent } from './fleet-dashboard';

describe('FleetDashboard', () => {
  let component: FleetDashboardComponent;
  let fixture: ComponentFixture<FleetDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
