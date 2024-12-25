import React from 'react'
import { Link } from 'react-router-dom'

const StartPage = () => {
  return (
    <div>
      <div className='bg-[url(https://images.unsplash.com/photo-1650184723880-1f03e780b2cb?q=80&w=1594&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center h-screen flex flex-col justify-between w-full pt-8 object-cover'>
        <img className='w-16 ml-8' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="uber" />
        <div className='bg-white pb-7 py-4 px-4 '>
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <div className='w-full'>
          <Link to='/login' className='flex items-center justify-center bg-black text-white py-3 w-full lg:w-[25%] xs:w-[50%] sm:w-[40%] md:w-[30%] rounded-lg mt-5 '>Continue</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartPage