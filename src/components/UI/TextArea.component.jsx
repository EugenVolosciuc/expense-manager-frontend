import React from 'react'

const TextArea = ({ type = 'text', onChange, value, className, style, name, hookRef, placeholder, label }) => {
    return (
        <>
            {label && <label className="mb-1" htmlFor={"for " + name}>{label}</label>}
            <textarea
                id={"for " + name}
                placeholder={placeholder}
                ref={hookRef}
                name={name}
                style={style}
                className={`p-2 mb-4 rounded border-solid border-2 border-gray-300 focus:border-gray-400 ${className}`}
                type={type}
                onChange={onChange}>
                {value}
            </textarea>
        </>
    )
}

export default TextArea