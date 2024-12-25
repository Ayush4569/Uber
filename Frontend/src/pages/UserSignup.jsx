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
          <form onSubmit={(e) => submitHandler(e)}>
            <h3 className="text-base font-medium mb-2">What's your name </h3>
            <div className="flex gap-2 mb-6">
              <input
                required
                type="text"
                placeholder="First name"
                className="bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder:text-sm w-1/2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Last name"
                className="bg-[#eeeeee]  rounded px-4 py-2 border text-base placeholder:text-sm  w-1/2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <h3 className="text-base font-medium mb-2">What's your email </h3>
            <input
              required
              type="text"
              placeholder="Enter your email"
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border text-base placeholder:text-sm  w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className="text-base font-medium mb-2">Enter Password</h3>
            <input
              required
              type="password"
              placeholder="Enter your password"
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border text-base placeholder:text-sm w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-[#111] rounded text-white mb-3 px-4 py-2 text-lg w-full placeholder:text-base">
              Register
            </button>
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
