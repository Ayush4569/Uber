import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleName, setVehicleName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate()
  const submitHandler = async(e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        name:vehicleName,
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      setCaptain(response.data.captain)
      localStorage.setItem('token', response.data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setVehicleName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  };
  return (
    <div>
      <div className="py-5 px-5 flex flex-col justify-between h-screen">
        <div>
          <img
            className="w-20 mb-2"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="uber"
          />
          <form className="border lg:p-8" onSubmit={(e) => submitHandler(e)}>
            <h3 className="text-base font-medium mb-2">
              What's our Captain's name{" "}
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                required
                type="text"
                placeholder="First name"
                className="bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder:text-sm w-1/2 lg:placeholder:text-lg 
                xs:placeholder:text-lg sm:placeholder:text-lg md:placeholder:text-lg"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Last name"
                className="bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder:text-sm w-1/2 lg:placeholder:text-lg 
                xs:placeholder:text-lg sm:placeholder:text-lg md:placeholder:text-lg"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <h3 className="text-base font-medium mb-2">
              What's our Captain's email{" "}
            </h3>
            <input
              required
              type="text"
              placeholder="Enter your email"
              className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border text-base placeholder:text-sm w-full lg:placeholder:text-lg 
                xs:placeholder:text-lg sm:placeholder:text-lg md:placeholder:text-lg xs:w-1/2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className="text-base font-medium mb-2">Enter Password</h3>
            <input
              required
              type="password"
              placeholder="Enter your password"
              className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border text-base placeholder:text-sm w-full lg:placeholder:text-lg 
                xs:placeholder:text-lg sm:placeholder:text-lg md:placeholder:text-lg  xs:w-1/2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex gap-4 mb-4">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value);
                }}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-4 mb-4">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value);
                }}
              />
              <select
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-md placeholder:text-base"
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>
            <div>
            <input
                required
                className="bg-[#eeeeee] w-full mb-4 rounded-lg px-4 py-2 border text-lg placeholder:text-base xs:w-1/2"
                type="text"
                placeholder="Vehicle Name"
                value={vehicleName}
                onChange={(e) => {
                  setVehicleName(e.target.value);
                }}
              />
            </div>

            <div className="w-full ">
            <button className="bg-[#111] cursor-pointer rounded text-white mb-3 px-4 py-2 text-lg w-full placeholder:text-base xs:w-[40%] sm:w-1/3 md:w-[28%] lg:w-[18%] lg:rounded-lg hover:bg-white hover:text-black">
              Register
            </button>
          </div>
          </form>
          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/captain-login" className="text-blue-600 ">
              Login here
            </Link>{" "}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-center mt-6 leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline"> Google Privacy Policy</span> and{" "}
            <span className="underline"> Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
