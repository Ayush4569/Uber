import React from "react";

const ConfirmRide = ({
  createRide,
  pickup,
  destination,
  fare,
  vehicleType,
  setVehicleOpenPanel,
  setConfirmRidePanel,
  setVehicleFoundPanel,
}) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => {
          setConfirmRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center lg:flex-row xs:items-start sm:flex-row sm:items-center sm:justify-start">
        <img
          className="h-20 lg:h-28 sm:h-24"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full mt-5 lg:w-1/2 sm:w-[45%]">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{fare[vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            createRide()
            setConfirmRidePanel(false);
            setVehicleOpenPanel(false);
            setVehicleFoundPanel(true);
          }}
          className="w-full mt-5 bg-green-600 text-white font-semibold px-2 py-3 rounded-lg lg:w-[20%] lg:py-5 lg:ml-36 xs:w-[40%] xs:py-4 sm:w-[25%] sm:ml-12"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
