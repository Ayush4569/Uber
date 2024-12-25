import React from "react";

const VehiclePanel = ({
  fare,
  setConfirmRidePanel,
  setVehicleOpenPanel,
  setVehicleType,
}) => {
  return (
    <div className="">
      <h5
        className="p-1 text-center w-[93%] absolute top-1 cursor-pointer"
        onClick={() => {
          setVehicleOpenPanel(false);
        }}
      >
        <i className="text-3xl text-gray-700 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 lg:text-3xl lg:mb-2">
        Choose a vehicle
      </h3>
      <div className="lg:flex lg:w-full lg:h-auto lg:justify-start gap-5 xs:flex xs:justify-around xs:w-full xs:gap-1 lg:gap-4">
        <div
          onClick={() => {
            setConfirmRidePanel(true),
              setVehicleOpenPanel(false),
              setVehicleType("car");
          }}
          className="flex p-3 w-full items-center border-2 mb-2 active:border-black rounded-xl justify-between lg:w-auto lg:h-auto lg:flex-col lg:items-start  lg:justify-center lg:px-4 xs:w-1/3 xs:h-auto xs:flex-col xs:items-start md:h-46 md:w-[30%] "
        >
          <img
            className="h-12 lg:h-20 xs:h-14"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className="w-1/2 ml-2">
            <h4 className="font-medium text-base lg:text-xl xs:text-nowrap md:text-lg">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill "></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm lg:text-lg xs:text-nowrap  xs:text-lg">
              2 mins away
            </h5>
            <p className="font-normal text-xs lg:text-lg lg:text-nowrap xs:text-nowrap xs:items-start xs:text-xxs md:text-sm">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="text-lg font-semibold lg:ml-2 xs:ml-2">₹{fare.car}</h2>
        </div>
        <div
          onClick={() => {
            setConfirmRidePanel(true),
              setVehicleOpenPanel(false),
              setVehicleType("moto");
          }}
          className="flex p-3 w-full items-center border-2 mb-2 active:border-black rounded-xl justify-between lg:w-auto  lg:h-auto lg:flex-col lg:items-start  lg:justify-center lg:px-5 xs:w-1/3 xs:h-auto xs:flex-col xs:items-start xs:px-5 md:h-46 md:w-[30%] md:px-6"
        >
          <img
            className="h-12 lg:h-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt=""
          />
          <div className="w-1/2 mr-2">
            <h4 className="font-medium text-base lg:text-xl xs:text-nowrap xs:text-lg md:text-lg">
              Moto{" "}
              <span>
                <i className="ri-user-3-fill"></i>1
              </span>
            </h4>
            <h5 className="font-medium text-sm lg:text-lg xs:text-nowrap xs:text-lg">
              3 mins away
            </h5>
            <p className="font-normal text-xs lg:text-lg lg:text-nowrap xs:text-nowrap xs:text-xxs md:text-sm">
              Affordable, motorcycle rides
            </p>
          </div>
          <h2 className="text-lg font-semibold ">₹{fare.moto}</h2>
        </div>
        <div
          onClick={() => {
            setConfirmRidePanel(true),
              setVehicleOpenPanel(false),
              setVehicleType("auto");
          }}
          className="flex p-3 w-full items-center border-2 mb-2 active:border-black rounded-xl justify-between lg:w-[22%] lg:h-auto lg:flex-col lg:items-start  lg:justify-center lg:px-6 xs:w-1/3 xs:items-start xs:h-auto xs:flex-col xs:px-0 md:h-46 md:w-[30%] md:px-4"
        >
          <img
            className="h-12 lg:h-16"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
          <div className="w-1/2 ml-2">
            <h4 className="font-medium text-base text-nowrap lg:text-xl lg:text-nowrap md:text-lg">
              UberAuto{" "}
              <span>
                <i className="ri-user-3-fill text-nowrap"></i>1
              </span>
            </h4>
            <h5 className="font-medium text-sm lg:text-lg lg:text-nowrap xs:text-nowrap xs:text-lg">
              3 mins away
            </h5>
            <p className="font-normal text-xs lg:text-lg lg:text-nowrap xs:text-nowrap xs:text-xxs  md:text-sm">
              Affordable, auto rides
            </p>
          </div>
          <h2 className="text-lg font-semibold lg:ml-2 xs:ml-2">₹{fare.auto}</h2>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
