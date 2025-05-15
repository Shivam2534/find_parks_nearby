import React from "react";
import type { Park } from "../types";

type ParkModalProps = {
  open: boolean;
  onClose: () => void;
  park: Park | null;
};

export const ParkModal: React.FC<ParkModalProps> = ({
  open,
  onClose,
  park,
}) => {
  if (!open || !park) return null;

  return (
    <div className="">
      <div className="bg-[#F9FAFB] w-full max-w-md shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {park.name}
        </h2>

        <img
          src={park.imageUrl}
          alt={park.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        <p className="text-gray-700 mb-4">{park.description}</p>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Opening Hours:</span>{" "}
          {park.openingHours}
        </p>

        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Entry Fee:</span> {park.entryFee}
        </p>

        <div className="mb-3">
          <p className="font-medium text-gray-700 mb-1">Amenities:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {park.amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-gray-700">
          <span className="font-medium">Rating:</span> {park.rating} ⭐ (
          {park.reviewsCount} reviews)
        </p>
      </div>
    </div>
  );
};
