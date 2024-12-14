import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
          <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <img className="h-10 w-10 rounded-full object-cover" src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947"  />
            <h4 className="text-lg font-medium">Ayush Mishra</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">₹295.20</h4>
            <p className="text-sm text-gray-600">Earned </p>
          </div>
        </div>
        <div className="flex mt-8 p-4 bg-gray-200 rounded-xl justify-center gap-5 items-start">
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin  ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails