export interface Vehicle {  
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