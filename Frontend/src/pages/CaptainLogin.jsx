import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {  useCaptain } from '../context/CaptainContext'

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { captain, setCaptain } = useCaptain()
  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault();
    const captainData = {
      email,
      password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

    if (response.status === 200) {
      setCaptain(response.data.captain)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
  };
    return (
      <div className="p-7 flex flex-col justify-between h-screen">
        <div>
          <img
            className="w-20  mb-2"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
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
            Join a fleet ?{" "}
            <Link to="/captain-signup" className="text-blue-600 ">
              Register as a Captain
            </Link>{" "}
          </p>
        </div>
        <div>
          <Link to='/login' className="bg-[#d5622d] rounded text-white mb-5 px-4 py-2 text-lg w-full placeholder:text-base flex items-center justify-center">
            Sign in as User
          </Link>
        </div>
      </div>
  )
}

export default CaptainLogin