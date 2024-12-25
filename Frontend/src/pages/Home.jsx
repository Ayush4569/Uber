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
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState(null);
  const [destination, setDestination] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState(null);
  const [active, setActive] = useState('');
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
  const { socket } = useSocket();
  const { user } = useContext(UserDataContext);
  const [rideDetails, setRideDetails] = useState(null);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user?._id });
  }, []);

  socket.on("confirm-ride", (rideDetails) => {
    setWaitingForDriverPanel(true);
    setRideDetails(rideDetails);
  });

  socket.on("ride-started", (ride) => {
    navigate(`/riding/:${ride?._id}`, { state: { ride } });
  });

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          display:'block',
          opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          display:'none',
          opacity:0
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
          transform: "translateY(-10%)",
        });
      } else {
        gsap.to(vehicleRef.current, {
          transform: "translateY(110%)",
        });
      }
    },
    [vehicleOpenPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(-10%)",
        });
      } else {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(110%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFoundPanel) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(-10%)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(110%)",
        });
      }
    },
    [vehicleFoundPanel]
  );
  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(-10%)",
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
          params: { location: e.target.value },
        }
      );
      if (response.statusText == "OK") {
        // console.log(response.data);
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
          params: { location: e.target.value },
        }
      );
      if (response.statusText == "OK") {
        // console.log(response.data);
        setDestinationSuggestions(response.data);
      }
    } catch (error) {
      console.log("Error fetching suggestions", error);
    }
  }
  async function getFare() {
    console.log('clicked');
    setPanelOpen(false);
    setVehicleOpenPanel(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
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
          vehicleType,
        }
      );
      console.log('res',response.data);
    } catch (error) {
      console.log("Error creating ride", error);
    }
  }
  async function logoutUser() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/logout`);
      if (response.statusText === "OK") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-screen relative overflow-y-hidden">
      <div className="fixed flex w-full justify-between items-center p-6 lg:p-3">
        <img
          className="w-16"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="uber"
        />
        <button
          onClick={logoutUser}
          className="h-10 w-10 rounded-full bg-white flex items-center justify-center"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </button>
      </div>
      <div className="lg:h-screen lg:flex lg:flex-row-reverse lg:gap-6 lg:p-16">
        {/* map */}
      <div className="h-screen w-screen lg:w-[70%]">
        <LiveTracking className='h-[70%] z-[-1] lg:h-[85%]'/>
      </div>
      {/* loction search panel */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full lg:w-[30%] lg:h-auto lg:relative">
        <div className="bg-white overflow-y-scroll p-6 h-[30%] relative lg:absolute lg:top-0 lg:flex-col lg:w-full lg:text-nowrap border lg:h-auto lg:rounded-lg xs:h-max">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute top-6 right-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className="text-2xl font-semibold lg:text-2xl lg:ml-2">Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="flex flex-col">
              <input
                className="bg-[#eee] px-12 py-2 text-lg lg:text-xl rounded-lg w-full mt-3 lg:w-full lg:py-3 lg:px-6 xs:w-1/2 xs:text-base xs:py-3 xs:px-6"
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
                className="bg-[#eee] px-12 py-2 text-lg lg:text-xl rounded-lg w-full mt-3 lg:w-full lg:py-3 lg:px-6 xs:w-1/2 xs:text-base xs:py-3 xs:px-6"
                type="text"
                placeholder="Enter your destination"
                value={destination}
                onClick={() => {
                  setPanelOpen(true), setActive("destination")
                }}
                onChange={(e) => {getDestinationSuggestions(e)}}
              />
            </div>
          </form>
          <button
            onClick={() => getFare()}
            className="bg-black lg:w-full font-mono cursor-pointer text-white p-4 rounded-lg w-full mt-2 lg:p-3 lg:mt-4 lg:text-lg xs:w-[35%]"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className={`bg-white lg:hidden lg:w-[88%] lg:absolute  lg:left-6 lg:rounded-lg  lg:shadow-md border ${active == 'pickup' ? 'lg:top-[7.6rem]':'lg:top-[11.6rem]'}`}>
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
      </div>


      {/* vehcle div */}
      <div
        ref={vehicleRef}
        className="fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-10 pt-12 xs:px-1 lg:bottom-0 lg:pt-4 lg:py-0"
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
        className="fixed w-full z-10 bg-white bottom-0 -translate-y-full px-3 py-6 pt-12  lg:pt-4 lg:py-0 "
      >
        <ConfirmRide
          createRide={createRide}
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
        className="fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12
        lg:pt-4 lg:py-0 sm:pt-4 sm:py-0 md:pt-4 md:py-0"
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
        className="fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-6 pt-12
        lg:pt-0 lg:py-0 sm:pt-4 sm:py-0 md:pt-4 md:py-0"
      >
        <WaitingForDriver
          ride={rideDetails}
          waitingForDriverPanel={setWaitingForDriverPanel}
        />
      </div>
    </div>
  );
};

export default Home;
