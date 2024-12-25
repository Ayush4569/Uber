import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/userContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    let userData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };
    console.log(userData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/signup`,userData
      );
      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem('token',response.data.token)
        navigate("/home");
      }
    } catch (error) {
      console.log("Error at user signup", error);
    } finally {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    }
  };
  return (
    <div>
      <div className="p-7 flex flex-col justify-between h-screen">
        <div>
          <img
            className="w-16 mb-10"
            src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
            alt="uber"
          />
          <form className="lg:mx-auto lg:p-8" onSubmit={(e) => submitHandler(e)}>
            <h3 className="text-base font-medium mb-2 text-center lg:text-xl">What's your name </h3>
            <div className="flex gap-2 mb-6 lg:flex-col lg:gap-6 lg:justify-center lg:items-center xs:flex-col xs:gap-6 xs:justify-center xs:items-center md:flex-col md:gap-6 md:justify-center md:items-center">
              <input
                required
                type="text"
                placeholder="First name"
                className="bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder:text-sm w-1/2 lg:w-[40%] text-center lg:placeholder:text-lg 
                xs:placeholder:text-lg sm:placeholder:text-lg md:placeholder:text-lg
                xs:w-[80%] sm:w-[65%] md:w-[55%] xs:rounded-lg"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Last name"
                className="bg-[#eeeeee]  rounded px-4 py-2 border text-base placeholder:text-sm w-1/2 lg:w-[40%] text-center lg:placeholder:text-lg 
                xs:placeholder:text-lg sm:placeholder:text-lg md:placeholder:text-lg
                xs:w-[80%] sm:w-[65%] md:w-[55%] xs:rounded-lg"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="xs:flex xs:flex-col xs:justify-center xs:items-center w-full ">
            <h3 className="text-xl font-medium mb-2 xs:text-center">
              What's your email
            </h3>
            <input
              required
              type="email"
              placeholder="Enter your email"
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 text-lg w-full xs:w-[80%] text-center xs:rounded-lg sm:w-[65%] md:w-[55%] lg:w-[40%]"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="xs:flex xs:flex-col xs:justify-center xs:items-center w-full ">
            <h3 className="text-xl font-medium mb-2 xs:text-center">
              Enter Password
            </h3>
            <input
              required
              type="password"
              placeholder="Enter your password"
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 text-lg w-full xs:w-[80%] text-center xs:rounded-lg sm:w-[65%] md:w-[55%] lg:w-[40%]"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
             <div className="w-full xs:text-center">
            <button className="bg-[#111] cursor-pointer rounded text-white mb-3 px-4 py-2 text-lg w-full placeholder:text-base xs:w-[40%] sm:w-1/3 md:w-[28%] lg:w-[18%] lg:rounded-lg hover:bg-white hover:text-black">
              Register
            </button>
          </div>
          </form>
          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-600 ">
              Login here
            </Link>{" "}
          </p>
        </div>
        <div>
          <p className="text-sm leading-tight">

            This site is protected by reCAPTCHA and the{" "}
            <span className="underline"> Google Privacy Policy</span> and{" "}
            <span className="underline"> Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
