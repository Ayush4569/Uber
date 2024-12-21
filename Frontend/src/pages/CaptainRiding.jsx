import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React,{useState,useRef} from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import FinishRide from "./FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = ({}) => {
const [finishRidePanel, setFinishRidePanel] = useState(false)
const finishRidePanelRef = useRef(null)
  const location = useLocation();
  const rideData = location.state?.ride
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );
  return (
    <div className="h-screen relative">
      <div className="fixed flex w-full justify-between items-center p-6 ">
        <img
          className="w-16"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="uber"
        />
        <Link
          to="/home"
          className="h-10 w-10 rounded-full bg-white flex items-center justify-center"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-4/5">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        /> */}
        <LiveTracking className='h-full z-[-1]'/>
      </div>
      <div onClick={()=>{setFinishRidePanel(true)}} className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10">
        <h5
          className="p-1 text-center w-[90%] absolute top-0"
        
        >
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM Away</h4>
        <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bg-white bottom-0 px-3 py-10 pt-12"
      >
        <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
