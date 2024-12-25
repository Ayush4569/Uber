import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { useCaptain } from "../context/CaptainContext";
import { useSocket } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";
const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmridePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);
  const confirmridePopupPanelRef = useRef(null);
  const navigate = useNavigate();
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

  const { captain } = useCaptain();
  const { socket } = useSocket();
  useEffect(() => {
    socket.emit("join", { userId: captain?._id, userType: "captain" });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    return () => clearInterval(locationInterval);
  }, []);
  socket.on("new-ride", (data) => {
  console.log('new ride');
    setRide(data);
    setRidePopupPanel(true);
  });
  // confirm ride when a captain accepts the incoming ride
  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
      }
    );
    if (response.statusText == "OK") {
      setRidePopupPanel(false);
    }
  }
  async function logoutCaptain() {

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/captains/logout`
      );
      if(response.statusText === 'OK'){
        navigate('/captain-login')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen">
      <div className="fixed flex w-full justify-between items-center p-6 ">
        <img
          className="w-16"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="uber"
        />
        <button onClick={logoutCaptain} className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </button>
      </div>

      <div className="h-[70%]">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
        {/* <LiveTracking className="h-full z-[-1]" /> */}
      </div>
      <div className={`h-2/5 p-6 `}>
        <CaptainDetails captain={captain} />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bg-white bottom-0 px-3 py-10 pt-12"
      >
        <RidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmridePopupPanelRef}
        className="fixed w-full h-screen z-10 bg-white bottom-0 px-3 py-10 pt-12"
      >
        <ConfirmRidePopup
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
