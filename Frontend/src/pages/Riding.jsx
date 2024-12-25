import React from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { useSocket } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride
  const navigate = useNavigate()
  const {socket} = useSocket();
  socket.on('ride-finished',(data)=>{
    // console.log(data);
    navigate('/home')
  })
  return (
    <div className='h-screen'>
     <Link to='/home' className='fixed top-2 right-2 h-10 w-10 rounded-full bg-white flex items-center justify-center'>
     <i className="text-lg font-medium ri-home-4-line"></i>
     </Link>
     <div className='h-[65%]'>
     <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
        {/* <LiveTracking className='h-full z-[-1]'/> */}
     </div>
     <div className='h-[35%] p-4'>
     <div className='flex items-center justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{ride?.fare} </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash </p>
            </div>
          </div>
        </div>
      </div>
      <button className='w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg sm:w-[30%]'> Make payment</button>
     </div>
    </div>
  )
}

export default Riding