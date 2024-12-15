import React from "react";

const VehiclePanel = ({ fare, setConfirmRidePanel, setVehicleOpenPanel,setVehicleType }) => {
  return (
    <>
      <h5
        className="p-1 text-center w-[93%] absolute top-1"
        onClick={() => {
          setVehicleOpenPanel(false);
        }}
      >
        <i className="text-3xl text-gray-700 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>
      <div
        onClick={() => {
          setConfirmRidePanel(true), setVehicleOpenPanel(false),setVehicleType('car');
        }}
        className="flex p-3 w-full items-center border-2 mb-2 active:border-black rounded-xl justify-between"
      >
        <img
          className="h-12"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.car}</h2>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true), setVehicleOpenPanel(false),setVehicleType('moto') ;
        }}
        className="flex p-3 w-full items-center border-2 mb-2 active:border-black rounded-xl justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2 -ml-2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs">Affordable, motorcycle rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.moto}</h2>
      </div>
      <div
        onClick={() => {
          setConfirmRidePanel(true), setVehicleOpenPanel(false),setVehicleType('auto') ;
        }}
        className="flex p-3 w-full items-center border-2 mb-2 active:border-black rounded-xl justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs">Affordable, auto rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.auto}</h2>
      </div>
    </>
  );
};

export default VehiclePanel;
