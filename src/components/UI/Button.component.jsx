import React from 'react'

import Loader from './Loader.component'

const Button = ({type = 'primary', className, style, children, onClick, loading = false, disabled = false}) => {
    const getTypeClasses = () => {
        switch (type) {
            case 'primary':
                return 'bg-accent text-secondary'
            case 'default':
                return ''
            case 'link':
                return ''
            case 'danger':
                return ''
            default: 
                return 'primary'
        }
    }

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            style={style}
            className={`rounded py-2 px-4 ${getTypeClasses()} ${className}`}>
            {loading && <Loader className="mr-2" />}
            {children}
        </button>
    )
}

export default Button