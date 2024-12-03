import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
  };
  useGSAP(function () {
   if(panelOpen){
    gsap.to(panelRef.current, {
      height: "70%",
      padding:24
      // opacity:1
    });
    gsap.to(panelCloseRef.current,{
      opacity:1
    })
   }
   else{
    gsap.to(panelRef.current, {
      height: "0%",
      // opacity:0
    });
    gsap.to(panelCloseRef.current, {
      opacity:0
    });
   }
  },[panelOpen]);
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
            <h5 ref={panelCloseRef} onClick={()=>setPanelOpen(false)}  className="absolute top-6 right-6 text-2xl">
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
                onClick={()=>{setPanelOpen(true)}}
                onChange={(e) => setPickup(e.target.value)}
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                type="text"
                placeholder="Enter your destination"
                value={destination}
                onClick={()=>{setPanelOpen(true)}}
                onChange={(e) => setDestination(e.target.value)}
              />
            </form>
          </div>
          <div ref={panelRef} className="bg-white h-0">
            <LocationSearchPanel/>
          </div>
      </div>
      <div className="fixed w-full z-10 bg-white bottom-0 translate-y-full px-3 py-8">
        <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>
           <div className="flex p-3 w-full items-center border-2 mb-2 active:border-black rounded-xl justify-between">
             <img className="h-12" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
             <div className="w-1/2 ml-2">
              <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
              <h5 className="font-medium text-sm">2 mins away</h5>
              <p className="font-normal text-xs">Affordable, compact rides</p>
             </div>
             <h2 className="text-lg font-semibold">$192.20</h2>
           </div>
           <div className="flex p-3 w-full items-center border-2 mb-2 active:border-black rounded-xl justify-between">
             <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
             <div className="w-1/2 -ml-2">
              <h4 className="font-medium text-base">Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
              <h5 className="font-medium text-sm">3 mins away</h5>
              <p className="font-normal text-xs">Affordable, motorcycle rides</p>
             </div>
             <h2 className="text-lg font-semibold">$65</h2>
           </div>
           <div className="flex p-3 w-full items-center border-2 mb-2 active:border-black rounded-xl justify-between">
             <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
             <div className="w-1/2 ml-2">
              <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-3-fill"></i>1</span></h4>
              <h5 className="font-medium text-sm">3 mins away</h5>
              <p className="font-normal text-xs">Affordable, auto rides</p>
             </div>
             <h2 className="text-lg font-semibold">$118.86</h2>
           </div>
          
      </div>
    
    </div>
  );
};

export default Home;
