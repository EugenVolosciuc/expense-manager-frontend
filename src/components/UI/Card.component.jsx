import React from 'react'

const Card = ({ title, children, extra, className = '', footerContent = null }) => {
    const headerHeight = 56
    return (
        <div className={`bg-white w-full rounded ${className} relative`}>
            {/* Header */}
            <div className="p-4 bg-secondary" style={{ height: headerHeight }}>
                <div className="flex justify-between">
                    <div>{title}</div>
                    <div>{extra}</div>
                </div>
            </div>
            {/* Main content */}
            <div className="p-4 overflow-auto" style={{ 
                height: `calc(100% - ${footerContent ? headerHeight * 2 : headerHeight}px)` 
            }}>
                {children}
            </div>
            {/* Footer */}
            {
                footerContent &&
                <div className="p-4 absolute bottom-0 left-0 w-full bg-white border-t">
                    {footerContent}
                </div>
            }
        </div>
    )
}

export default Card