import { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import type { UserLocation, RadiusOption } from "../types";
import { findParksInRadius, findNearestPark } from "../utils/geoUtils";
import { SAMPLE_PARKS } from "../utils/parkData";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import type { Park } from "../types";
import SearchBox from "./SearchBox";

const Map = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<RadiusOption>(5);
  const [nearbyParks, setNearbyParks] = useState<Park[]>([]);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Unable to access your location. Please enable location services."
          );
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  }, []);

  // Update nearby parks when user location or radius changes
  useEffect(() => {
    if (userLocation) {
      const parks = findParksInRadius(
        SAMPLE_PARKS,
        userLocation,
        selectedRadius
      );
      setNearbyParks(parks);
    }
  }, [userLocation, selectedRadius]);

  // Calculate route to nearest park
  const calculateRoute = useCallback(() => {
    if (!userLocation || !map) return;

    const nearestPark = findNearestPark(nearbyParks, userLocation);
    if (!nearestPark) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLocation,
        destination: nearestPark.location,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        }
      }
    );
  }, [userLocation, nearbyParks, map]);

  // Update route when nearby parks change
  useEffect(() => {
    calculateRoute();
  }, [calculateRoute, nearbyParks]);

  return (
    <div className="w-full md:px-0 py-0">
      <div className="bg-white  shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <MapPin className="mr-2" size={20} />
            Park Finder
          </h2>
          <p className="text-sm opacity-90">Find parks near your location</p>
        </div>

        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-10">
            <div className="flex items-center">
              <label
                htmlFor="radius"
                className="text-sm font-medium text-gray-700 mr-2 md:mr-3"
              >
                Search Radius:
              </label>
              <select
                id="radius"
                value={selectedRadius}
                onChange={(e) =>
                  setSelectedRadius(Number(e.target.value) as RadiusOption)
                }
                className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm text-gray-700  bg-white border px-3 py-2"
              >
                <option value={1}>1 km</option>
                <option value={2}>2 km</option>
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={1500}>1500 km</option>
              </select>
            </div>

            {userLocation && (
              <div>
                <SearchBox
                  userLocation={userLocation}
                  map={map}
                  radius={selectedRadius}
                />
              </div>
            )}
          </div>

          <div className="flex items-center text-sm">
            {userLocation ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                Location found
              </span>
            ) : isLoading ? (
              <span className="inline-flex items-center text-gray-500">
                <Loader2 className="animate-spin mr-1.5" size={14} />
                Getting location...
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                Location unavailable
              </span>
            )}
          </div>
        </div>

        {error ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Location Error
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center h-[600px] bg-gray-50">
            <div className="text-center">
              <Loader2 className="animate-spin h-8 w-8 text-teal-500 mx-auto mb-4" />
              <p className="text-gray-500">Loading map...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="relative">
              <LoadScript
                googleMapsApiKey={
                  import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
                }
              >
                <GoogleMap
                  mapContainerClassName="w-full h-[600px]"
                  center={userLocation || { lat: 40.7128, lng: -73.935242 }}
                  zoom={14}
                  onLoad={setMap}
                  options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                  }}
                >
                  {/* User location marker */}
                  {userLocation && (
                    <Marker
                      position={userLocation}
                      icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                      }}
                    />
                  )}

                  {/* Park markers */}
                  {nearbyParks.map((park) => (
                    <Marker
                      key={park.id}
                      position={park.location}
                      title={park.name}
                      
                    />
                  ))}

                  {/* Directions to nearest park */}
                  {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
              </LoadScript>

              {/* Map overlay with park info */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg max-w-xs border border-gray-200 text-sm">
                <div className="font-medium text-gray-900 mb-1 flex items-center">
                  <Navigation className="w-4 h-4 mr-1 text-teal-600" />
                  Nearby Parks
                </div>
                {nearbyParks.length > 0 ? (
                  <div className="text-gray-600 text-xs">
                    Found {nearbyParks.length} parks within {selectedRadius}km
                    {nearbyParks.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="font-medium">Closest park:</div>
                        <div>
                          {findNearestPark(nearbyParks, userLocation!)?.name}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 text-xs">
                    No parks found in this area
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-center">
          Click on a park marker to see details. Directions to the nearest park
          are shown automatically.
        </div>
      </div>
    </div>
  );
};

export default Map;
