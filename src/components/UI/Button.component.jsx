import React from 'react'

import Loader from './Loader.component'

const Button = ({type = 'primary', className, style, children, onClick, loading = false, disabled = false}) => {
    const getTypeClasses = () => {
        switch (type) {
            case 'primary':
                return 'bg-accent text-secondary'
            case 'default':
                return 'border-accent border-2 text-accent bg-transparent'
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
            className={`rounded py-2 px-6 ${getTypeClasses()} ${className}`}>
            {loading && <Loader className="mr-2" />}
            {children}
        </button>
    )
}

export default Button