export interface Vehicle {  // <--- Make sure 'export' is here!
  id: string;
  plateNumber: string;
  driverName: string;
  status: 'Available' | 'In Transit' | 'Maintenance';
  fuelLevel: number; 
  lastLocation: {
    lat: number;
    lng: number;
  };
}