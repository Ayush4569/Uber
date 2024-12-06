import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehicleOpenPanel, setVehicleOpenPanel] = useState(false);
  const vehicleRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRideRef = useRef(null);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const waitingForDriverRef = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
  };
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          // padding:24
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehicleOpenPanel) {
        gsap.to(vehicleRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleOpenPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFoundPanel) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFoundPanel]
  );
  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverPanel]
  );
  return (
    <div className="h-screen relative overflow-y-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
        alt="uber"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="bg-white p-6 h-[30%] relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Add a pickup location"
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
              }}
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onClick={() => {
                setPanelOpen(true);
              }}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white  h-0">
          <LocationSearchPanel
            setVehicleOpenPanel={setVehicleOpenPanel}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
      {/* vehcle div */}
      <div
        ref={vehicleRef}
        className="fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-10 pt-12"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleOpenPanel={setVehicleOpenPanel}
        />
      </div>
      {/* confirm ride div */}
      <div
        ref={confirmRideRef}
        className="fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleOpenPanel={setVehicleOpenPanel}
          setVehicleFoundPanel={setVehicleFoundPanel}
        />
      </div>
      {/* looking for drivers div */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12"
      >
        <LookingForDriver
          setVehicleFoundPanel={setVehicleFoundPanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      {/* waiting for drivers div */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12"
      >
        <WaitingForDriver
          waitingForDriverPanel={waitingForDriverPanel}
        />
      </div>
    </div>
  );
};

export default Home;
