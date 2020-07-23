import React from 'react'

import { Navbar } from '../UI'

const BaseLayout = ({ children, user, className = '', style, innerStyle }) => {
    return (
        <div className={className} style={style}>
            <Navbar user={user} />
            <div className="px-8 py-4 mx-auto h-full" style={innerStyle}>
                {children}
            </div>
        </div>
    )
}

export default BaseLayout