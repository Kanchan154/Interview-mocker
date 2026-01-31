import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../../store/authStore'
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Webcam from 'react-webcam'
const Interview = () => {
  const { user } = useAuthStore();
  const [ iswebcamEnable, setIsWebcamEnable ] = useState(false);
  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <div className='p-4 mx-auto max-w-7xl'>
      {/* Left section */}
      <div></div>
      {/* Right section Webcam */}
      <div>
        {iswebcamEnable &&
          (
            <Webcam
              onUserMedia={() => setIsWebcamEnable(true)}
              onUserMediaError={() => setIsWebcamEnable(false)}
              mirrored={true}
              style={{
                height: 500,
                width: 1200,
                margin: 20
              }} />
          )
        }
        {!iswebcamEnable &&
          <div>
            <WebcamIcon className='w-full p-20 bg-transparent border rounded-lg h-72 my-7 ' />
            <button className='w-full' onClick={() => setIsWebcamEnable(true)}>Enable Webcam and Microphone</button>
          </div>
        }

      </div>
    </div>
  )
}

export default Interview