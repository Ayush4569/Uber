import React, { useState } from "react";
import { Link } from "react-router-dom";
const ConfirmRidePopup = ({ setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [otp,setOtp] = useState('')
    function submitHandler(e){
      e.preventDefault()
    }

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          setRidePopupPanel(false)
        
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-300 mt-4">
        <div className="flex items-center justify-between gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947"
          />
          <h2 className="text-lg font-medium">Harsh Patel</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">Kankariya,Taloja</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">Bhopal</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.20</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash </p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={(e)=>submitHandler(e)}>
          <input
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              type="text"
              value={otp}
              onChange={e=>setOtp(e.target.value)}
              placeholder="Enter your OTP"
            />
            <Link
              to="/captain-riding" className="flex justify-center mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg text-lg"
            >
              Confirm
            </Link>
            <button
              onClick={() => {
                setRidePopupPanel(false), setConfirmRidePopupPanel(false);
              }}
              className="w-full text-lg mt-1 bg-red-600 text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
