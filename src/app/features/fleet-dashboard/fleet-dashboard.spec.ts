import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetDashboard } from './fleet-dashboard';

describe('FleetDashboard', () => {
  let component: FleetDashboard;
  let fixture: ComponentFixture<FleetDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
