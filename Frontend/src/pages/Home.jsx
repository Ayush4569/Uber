import React, { useState, useRef, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { useSocket } from "../context/SocketContext";
import  { UserDataContext } from "../context/userContext";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState(null);
  const [destination, setDestination] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState(null);
  const [active, setActive] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
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
  const {socket} = useSocket()
  const { user } = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    socket.emit('join',{userType:'user',userId:user?._id})
  }, [])
  
  socket.on('confirm-ride',()=>{
    setWaitingForDriverPanel(true)
  })

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

  async function getPickupSuggestions(e) {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          params: { location: e.target.value },
        }
      );
      if (response.statusText == "OK") {
        console.log(response.data);
        setPickupSuggestions(response.data);
      }
    } catch (error) {
      console.log("Error fetching suggestions", error);
    }
  }
  async function getDestinationSuggestions(e) {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          params: { location: e.target.value },
        }
      );
      if (response.statusText == "OK") {
        console.log(response.data);
        setDestinationSuggestions(response.data);
      }
    } catch (error) {
      console.log("Error fetching suggestions", error);
    }
  }
  async function getFare() {
    setPanelOpen(false);
    setVehicleOpenPanel(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.statusText === "OK") {
        console.log(response.data);
        setFare(response.data);
      }
    } catch (error) {
      console.log("Error getting fare", error);
    }
  }
  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log('Error creating ride',error);
    }
  }
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
                setPanelOpen(true), setActive("pickup");
              }}
              onChange={(e) => {
                getPickupSuggestions(e);
              }}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onClick={() => {
                setPanelOpen(true), setActive("destination");
              }}
              onChange={(e) => getDestinationSuggestions(e)}
            />
          </form>
          <button
            onClick={() => getFare()}
            className="bg-black text-white px-4 py-2 rounded-lg w-full mt-2"
          >
            Find trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white  h-0">
          <LocationSearchPanel
            suggestions={
              active === "pickup" ? pickupSuggestions : destinationSuggestions
            }
            active={active}
            setPickup={setPickup}
            setDestination={setDestination}
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
          fare={fare}
          setVehicleType={setVehicleType}
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
          createRide = {createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
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
           pickup={pickup}
           destination={destination}
           fare={fare}
           vehicleType={vehicleType}
          setVehicleFoundPanel={setVehicleFoundPanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      {/* waiting for drivers div */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12"
      >
        <WaitingForDriver waitingForDriverPanel={waitingForDriverPanel} />
      </div>
    </div>
  );
};

export default Home;
