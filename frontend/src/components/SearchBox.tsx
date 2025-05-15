import { useEffect, useState, useRef } from "react";
import type { Park } from "../types";
import { SAMPLE_PARKS } from "../utils/parkData";
import { ParkModal } from "./DescribtionModal";

function getDistanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function SearchBox({
  userLocation,
  map,
  radius,
}: {
  userLocation: { lat: number; lng: number };
  map: google.maps.Map | null;
  radius: number;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredParks, setFilteredParks] = useState<Park[]>([]); // parks within radius
  const [suggestions, setSuggestions] = useState<Park[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [selectedPark, setSelectedPark] = useState<Park | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSelectedPark(null);
  };

  useEffect(() => {
    if (map) {
      mapRef.current = map;
    }
  });

  useEffect(() => {
    if (!userLocation) return;
    const filtered = SAMPLE_PARKS.filter(
      (park) =>
        getDistanceInKm(
          userLocation.lat,
          userLocation.lng,
          park.location.lat,
          park.location.lng
        ) <= radius
    );
    setFilteredParks(filtered);
  }, [radius, userLocation]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    const matches = filteredParks.filter((park) =>
      park.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(matches);
  }, [searchTerm, filteredParks]);

  const handleSelectPark = (park: Park) => {
    setSelectedPark(park);
    setSearchTerm("");
    setSuggestions([]);
    setOpen(true);

    //zoom to park on map if using mapRef
    mapRef.current?.panTo({ lat: park.location.lat, lng: park.location.lng });
    mapRef.current?.setZoom(20);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search parks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-44 md:w-60"
      />

      {suggestions.length > 0 && (
        <ul className=" absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg w-60">
          {suggestions.map((park) => (
            <li
              key={park.id}
              onClick={() => handleSelectPark(park)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {park.name}
            </li>
          ))}
        </ul>
      )}

      {open && selectedPark && (
        <div className="fixed bottom-0 left-0 z-50">
          <ParkModal open={open} onClose={handleClose} park={selectedPark} />
        </div>
      )}
    </div>
  );
}

export default SearchBox;
