import React from 'react'

const LoadingState = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="flex flex-col gap-4 w-52">
                <div className="w-full h-32 skeleton"></div>
                <div className="h-4 skeleton w-28"></div>
                <div className="w-full h-4 skeleton"></div>
                <div className="w-full h-4 skeleton"></div>
            </div>
        </div>
    )
}

export default LoadingState