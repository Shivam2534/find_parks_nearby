export interface Park {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export type RadiusOption = 1 | 2 | 5 | 10; // in kilometers 