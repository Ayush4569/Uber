import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const FinishRide = ({ setFinishRidePanel, rideData }) => {
  const navigate = useNavigate();
  async function endRide() {
    try {
      const response = await axios.patch(
       `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: rideData._id,
        },
      );
      if (response.statusText === "OK") {
        setFinishRidePanel(false);
        navigate("/captain-home");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>
      <div className="flex items-center justify-between p-4 border-2 rounded-lg border-yellow-300 mt-4">
        <div className="flex items-center justify-between gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947"
          />
          <h2 className="text-lg font-medium capitalize">{`${rideData?.user.fullname.firstname} ${rideData?.user.fullname.lastname}`}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
      <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill lg:text-2xl sm:text-2xl"></i>
            <div>
              <h3 className="text-lg font-medium lg:text-xl sm:text-xl">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600 lg:text-xl sm:text-xl xs:text-base">{rideData?.pickup || 'thakurli'}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill lg:text-2xl sm:text-2xl"></i>
            <div>
              <h3 className="text-lg font-medium lg:text-xl sm:text-xl">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600 lg:text-xl sm:text-xl xs:text-base">{rideData?.destination || 'thane'}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line lg:text-2xl sm:text-2xl"></i>
            <div>
              <h3 className="text-lg font-medium lg:text-xl sm:text-xl xs:text-base">₹{rideData?.fare[vehicleType] || '200'}</h3>
              <p className="text-sm -mt-1 text-gray-600 lg:text-xl sm:text-xl xs:text-base">Cash </p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <button
            onClick={endRide}
            className="flex text-lg w-full justify-center mt-5 bg-green-600 text-white font-semibold px-3 py-4 rounded-lg xs:w-[30%] lg:w-[25%]"
          >
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
