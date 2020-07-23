import React from 'react'

const Input = ({ type = 'text', onChange, onBlur = () => null, onFocus = () => null, value, className, style, name, hookRef, placeholder, label, readOnly }) => {
    return (
        <>
            {label && <label className="mb-1" htmlFor={"for " + name}>{label}</label>}
            <input
                readOnly={readOnly}
                onBlur={onBlur}
                onFocus={onFocus}
                id={"for " + name}
                placeholder={placeholder}
                ref={hookRef}
                name={name}
                style={style}
                className={`p-2 mb-4 rounded border-solid border-2 border-gray-300 focus:border-gray-400 ${className}`}
                type={type}
                onChange={onChange}
                value={value}
            />
        </>
    )
}

export default Input