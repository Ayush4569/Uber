import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        setUser(response.data.user);
        navigate("/home");
      }
    } catch (error) {
      console.log("Error at user login", error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen sm:justify-center  lg:justify-center xs:justify-center">
      <div>
        <img
          className="w-16 mb-10 lg:absolute lg:top-8 sm:absolute sm:top-8 xs:absolute xs:top-8"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="uber"
        />
        <form className="lg:p-8 lg:pb-0" onSubmit={(e) => submitHandler(e)}>
          <div className="xs:flex xs:flex-col xs:justify-center xs:items-center w-full ">
            <h3 className="text-xl font-medium mb-2 xs:text-center">
              What's your email
            </h3>
            <input
              required
              type="email"
              placeholder="Enter your email"
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 text-lg w-full xs:w-[80%] text-center xs:rounded-lg sm:w-[65%] md:w-[55%] lg:w-[30%]"
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
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 text-lg w-full xs:w-[80%] text-center xs:rounded-lg sm:w-[65%] md:w-[55%] lg:w-[30%]"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="w-full xs:text-center">
            <button className="bg-[#111] cursor-pointer rounded text-white mb-3 px-4 py-2 text-lg w-full placeholder:text-base xs:w-[40%] sm:w-1/3 md:w-[28%] lg:w-[18%] lg:rounded-lg hover:bg-white hover:text-black">
              Login
            </button>
          </div>
        </form>
        <p className="text-center xs:text-lg xs:mt-4 lg:text-xl lg:mt-4">
          New here ?{" "}
          <Link to="/signup" className="text-blue-600 ">
            Create new Account
          </Link>{" "}
        </p>
      </div>
      <div className="w-full xs:flex xs:justify-center">
        <Link
          to="/captain-login"
          className="bg-[#0eae5e] rounded text-white mb-5 px-4 py-2 text-lg w-full placeholder:text-base flex items-center justify-center xs:w-max lg:mt-4 sm:mt-4 xs:mt-4"
        >
          Sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
