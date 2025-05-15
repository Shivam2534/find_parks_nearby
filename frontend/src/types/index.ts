export interface Park {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  openingHours: string;
  amenities: string[];
  entryFee: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export type RadiusOption = 1 | 2 | 5 | 10; // in kilometers
