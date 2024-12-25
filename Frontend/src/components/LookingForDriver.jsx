import React from "react";

const LookingForDriver = ({
  pickup,
  destination,
  fare,
  vehicleType,
  setVehicleFoundPanel,
  setConfirmRidePanel,
}) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => {
          setConfirmRidePanel(false), setVehicleFoundPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for your Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center lg:flex-row xs:items-start sm:flex-row sm:items-center sm:justify-start">
        <img
          className="h-20 lg:h-28 sm:h-24"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full mt-5 lg:ml-10 sm:ml-10">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill lg:text-2xl sm:text-2xl"></i>
            <div>
              <h3 className="text-lg font-medium lg:text-xl sm:text-xl">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600 lg:text-xl sm:text-xl xs:text-base">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill lg:text-2xl sm:text-2xl"></i>
            <div>
              <h3 className="text-lg font-medium lg:text-xl sm:text-xl">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600 lg:text-xl sm:text-xl xs:text-base">{destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line lg:text-2xl sm:text-2xl"></i>
            <div>
              <h3 className="text-lg font-medium lg: sm:">₹{fare[vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600 lg:text-xl sm:text-xl xs:text-base">Cash </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
