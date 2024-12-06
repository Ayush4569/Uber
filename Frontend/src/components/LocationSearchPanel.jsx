import React from "react";

const LocationSearchPanel = ({ setVehicleOpenPanel, setPanelOpen }) => {
  const locations = [
    "24B, Near Kapoor's cafe, Sheriyans Coding School, Bhopal",
    "20C, Near Malhotra's cafe, Sheriyans Coding School, Bhopal",
    "18B, Near Singhania's cafe, Sheriyans Coding School, Bhopal",
    "28A, Near Mishra's cafe, Sheriyans Coding School, Bhopal",
  ];
  return (
    <div>
      {/* sample data */}
      {locations.map((location) => (
        <div
          onClick={() => {
            setPanelOpen(false), setVehicleOpenPanel(true);
          }}
          key={location}
          className="flex border-2 p-3 border-gray-50 active:border-black rounded-xl mb-2 items-center justify-start gap-4"
        >
          <h2 className="bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center">
            <i className="ri-map-pin-fill "></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
