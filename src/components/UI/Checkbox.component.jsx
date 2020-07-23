import React from 'react'

const Checkbox = ({ name, label, hookRef, className, checked }) => {
    return (
        <label className={`checkbox-container block relative pl-8 mb-4 cursor-pointer ${className}`} style={{userSelect: 'none'}} htmlFor={`for ${name}`}>
            <span>{label}</span>
            <input ref={hookRef} name={name} className={`absolute opacity-0 cursor-pointer h-0 w-0 ${checked ? 'show-checkmark' : ''}`} type="checkbox" id={`for ${name}`} />
            <span className="checkmark"></span>
        </label>
    )
}

export default Checkbox