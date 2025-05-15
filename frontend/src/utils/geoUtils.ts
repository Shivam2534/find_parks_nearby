import type { Park, UserLocation } from '../types';

// Calculate distance between two points using the Haversine formula
export const calculateDistance = (point1: UserLocation, point2: UserLocation): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Convert degrees to radians
const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Find parks within radius
export const findParksInRadius = (
  parks: Park[],
  userLocation: UserLocation,
  radius: number
): Park[] => {
  return parks.filter(park => 
    calculateDistance(userLocation, park.location) <= radius
  );
};

// Find nearest park
export const findNearestPark = (
  parks: Park[],
  userLocation: UserLocation
): Park | null => {
  if (parks.length === 0) return null;
  
  return parks.reduce((nearest, current) => {
    const nearestDistance = calculateDistance(userLocation, nearest.location);
    const currentDistance = calculateDistance(userLocation, current.location);
    return currentDistance < nearestDistance ? current : nearest;
  });
}; 