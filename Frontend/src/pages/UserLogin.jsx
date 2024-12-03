import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate()
  const submitHandler = async(e) => {
    e.preventDefault();
    let userData = {
      email,
      password
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,userData
      );
      if (response.status === 200) {
        localStorage.setItem('token',response.data.token)
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
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10 "
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="uber"
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-xl font-medium mb-2">What's your email</h3>
          <input
            required
            type="email"
            placeholder="Enter your email"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border text-lg w-full"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h3 className="text-xl font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            placeholder="Enter your password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border text-lg w-full"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="bg-[#111] rounded text-white mb-3 px-4 py-2 text-lg w-full placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          New here ?{" "}
          <Link to="/signup" className="text-blue-600 ">
            Create new Account
          </Link>{" "}
        </p>
      </div>
      <div>
        <Link to='/captain-login' className="bg-[#0eae5e] rounded text-white mb-5 px-4 py-2 text-lg w-full placeholder:text-base flex items-center justify-center">
          Sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
