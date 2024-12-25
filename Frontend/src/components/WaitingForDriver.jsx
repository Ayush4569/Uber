import React from "react";

const WaitingForDriver = ({ waitingForDriverPanel, ride }) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => {
          waitingForDriverPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <div className="flex items-center justify-between ">
        <img
          className="h-20 lg:h-28 sm:h-24"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">{`${ride?.captain.fullname.firstname} ${ride?.captain.fullname.lastname}`}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {ride?.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">{ride?.captain.vehicle.name }</p>
          <h1 className="text-lg font-semibold"> {ride?.otp} </h1>
        </div>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
      <div className="w-full mt-5 lg:ml-10 sm:ml-10">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill lg:text-2xl sm:text-2xl"></i>
            <div>
              <h3 className="text-lg font-medium lg:text-xl sm:text-xl">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600 lg:text-xl sm:text-xl xs:text-base">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill lg:text-2xl sm:text-2xl"></i>
            <div>
              <h3 className="text-lg font-medium lg:text-xl sm:text-xl">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600 lg:text-xl sm:text-xl xs:text-base">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line lg:text-2xl sm:text-2xl"></i>
            <div>
              <h3 className="text-lg font-medium lg: sm:">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600 lg:text-xl sm:text-xl xs:text-base">Cash </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
