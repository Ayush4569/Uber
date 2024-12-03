import React from 'react'

const LocationSearchPanel = () => {
  return (
    <div>
      {/* sample data */}
      <div className='flex border-2 p-3 border-gray-50 active:border-black rounded-xl my-2 items-center justify-start gap-4'>
        <h2 className='bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center'><i className="ri-map-pin-fill "></i></h2>
        <h4 className='font-medium'>24B, Near Kapoor's cafe, Sheriyans Coding School, Bhopal</h4>
      </div>
      <div className='flex border-2 p-3 border-gray-50 active:border-black rounded-xl my-2 items-center justify-start gap-4'>
        <h2 className='bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center'><i className="ri-map-pin-fill "></i></h2>
        <h4 className='font-medium'>24B, Near Kapoor's cafe, Sheriyans Coding School, Bhopal</h4>
      </div>
      <div className='flex border-2 p-3 border-gray-50 active:border-black rounded-xl my-2 items-center justify-start gap-4'>
        <h2 className='bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center'><i className="ri-map-pin-fill "></i></h2>
        <h4 className='font-medium'>24B, Near Kapoor's cafe, Sheriyans Coding School, Bhopal</h4>
      </div>
    </div>
  )
}

export default LocationSearchPanel