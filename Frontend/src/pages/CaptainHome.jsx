import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { useCaptain } from "../context/CaptainContext";
const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmridePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmridePopupPanelRef = useRef(null);
  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );
  useGSAP(
    function () {
      if (confirmridePopupPanel) {
        gsap.to(confirmridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmridePopupPanel]
  );
  const {captain} = useCaptain()
  return (
    <div className="h-screen">
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

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className="h-2/5 p-6 ">
        <CaptainDetails captain={captain} />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bg-white bottom-0 px-3 py-10 pt-12"
      >
        <RidePopup setRidePopupPanel={setRidePopupPanel}   setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
      </div>
      <div
        ref={confirmridePopupPanelRef}
        className="fixed w-full h-screen z-10 bg-white bottom-0 px-3 py-10 pt-12"
      >
        <ConfirmRidePopup
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
