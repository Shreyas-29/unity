import React from 'react'

const SkeletonLoader = () => {
    return (
        <div className="flex flex-col items-start justify-between w-full h-full p-4 lg:p-8 mt-4">
            <div className="flex flex-col items-start justify-start w-full h-full">
                <div className="flex flex-col items-start w-full h-full">
                    <div className="w-2/3 h-4 rounded skeleton"></div>
                    <div className="w-1/2 h-3 rounded skeleton mt-3"></div>
                </div>
                <div className="flex flex-col items-start w-full h-full">
                    <div className="w-2/3 h-4 rounded skeleton"></div>
                    <div className="w-1/2 h-3 rounded skeleton mt-3"></div>
                </div>
            </div>
            <div className="flex flex-col items-start w-full h-full">
                <div className="w-2/3 h-4 rounded skeleton"></div>
                <div className="w-1/2 h-3 rounded skeleton mt-3"></div>
            </div>
        </div>
    )
}

export default SkeletonLoader
