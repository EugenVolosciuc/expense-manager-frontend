import React from 'react'

const Card = ({title, children, extra, className = ''}) => {
    return (
        <div className={`bg-white w-full rounded ${className}`}>
            {/* Header */}
            <div className="p-4 bg-secondary">
                <div className="flex justify-between">
                    <div>{title}</div>
                    <div>{extra}</div>
                </div>
            </div>
            {/* Main content */}
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}

export default Card