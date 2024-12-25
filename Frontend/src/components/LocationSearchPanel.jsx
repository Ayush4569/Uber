import React from "react";

const LocationSearchPanel = ({
  suggestions,
  active,
  setPanelOpen,
  setPickup,
  setDestination,
}) => {
  function handleSuggestionClick(suggestion) {
    // console.log(active);
    if (active === "pickup") {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
    setPanelOpen(false)
  }
  const defaultSuggestions = ["Thakurli Station Road","Flat No. 12, Shanti Apartments Andheri West, Mumbai, Maharashtra 400058","H-32, South Extension Part 1 New Delhi, Delhi 110049","No. 45, Sai Residency Whitefield Main Road, Bangalore, Karnataka 560066","Plot No. 21, Raghavan Street T. Nagar, Chennai, Tamil Nadu 600017","Flat No. 201, Krishna Residency Banjara Hills, Hyderabad, Telangana 500034" ]
  return (
    <div className="p-4 ">
      {
        suggestions ? (
          suggestions.map((location) => (
            <div
              onClick={() => {
                handleSuggestionClick(location.description);
              }}
              key={location.place_id}
              className="flex p-2 active:border-black rounded-xl mb-2 items-center justify-start border border-gray-300 gap-4"
            >
              <h2 className="bg-[#eee] h-8 w-8 rounded-full flex items-center justify-center">
                <i className="ri-map-pin-fill "></i>
              </h2>
              <h4 className="font-medium text-sm ">{location.description}</h4>
            </div>
          ))
        ) : (
          defaultSuggestions.map((location,idx) => (
            <div
              onClick={() => {
                handleSuggestionClick(location);
              }}
              key={idx}
              className="flex p-2 active:border-black rounded-xl mb-2 items-center justify-start border border-gray-300 gap-4"
            >
              <h2 className="bg-[#eee] h-8 w-8 p-4 rounded-full flex items-center justify-center">
                <i className="ri-map-pin-fill "></i>
              </h2>
              <h4 className="font-medium text-sm">{location}</h4>
            </div>
          ))
        )
      }
      
    </div>
  );
};

export default LocationSearchPanel;
