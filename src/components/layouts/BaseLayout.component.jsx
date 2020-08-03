import React from 'react'

import { Navbar } from '../UI'

const BaseLayout = ({ children, user, className = '', style, innerStyle = {}, innerClassName = '' }) => {
    return (
        <div className={className} style={style}>
            <Navbar user={user} />
            <div className={`mx-auto h-full ${innerClassName}`} style={{...innerStyle, minHeight: 'calc(100vh - 68px - 56px)'}}>
                {children}
            </div>
            <footer className="w-full bg-main flex justify-center py-4">
                <p className="text-white">© {new Date().getFullYear()} Expense Manager</p>
            </footer>
        </div>
    )
}

export default BaseLayout