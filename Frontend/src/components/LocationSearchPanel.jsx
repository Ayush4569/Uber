import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setVehicleOpenPanel,
  setPanelOpen,
  active,
  setPickup,
  setDestination,
}) => {
  function handleSuggestionClick(suggestion) {
    if (active === "pickup") {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
    // setPanelOpen(false), setVehicleOpenPanel(true);
  }
  return (
    <div className="border border-red-600 mt-6">
      {suggestions?.map((location) => (
        <div
          onClick={() => {
            handleSuggestionClick(location.description);
          }}
          key={location.place_id}
          className="flex border-2 p-2 border-gray-50 active:border-black rounded-xl mb-2 items-center justify-start gap-4"
        >
          <h2 className="bg-[#eee] h-8 w-8 rounded-full flex items-center justify-center">
            <i className="ri-map-pin-fill "></i>
          </h2>
          <h4 className="font-medium text-sm">{location.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
