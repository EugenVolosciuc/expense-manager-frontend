import React from 'react'

const Empty = ({message = "No Data", textClassName = ""}) => {
    return (
        <div className="w-full flex flex-col justify-center items-center p-10">
            <h3 className="text-3xl font-bold text-gray-600">. . .</h3>
            <p className={`text-gray-600 ${textClassName}`}>{message}</p>
        </div>
    )
}

export default Empty