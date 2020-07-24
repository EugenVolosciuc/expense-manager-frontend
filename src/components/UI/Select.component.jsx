import React from 'react'

const Select = ({ options, name, label, className, hookRef, defaultBlank }) => {
    return (
        <>
            {label && <label className="mb-1" htmlFor={"for " + name}>{label}</label>}
            <select 
                defaultValue={defaultBlank ? '' : null}
                ref={hookRef}
                style={{ height: 44 }}
                className={`p-2 mb-4 bg-white rounded border-solid border-2 border-gray-300 focus:border-gray-400 ${className}`}
                name={name} 
                id={"for " + name}>
                    {
                        defaultBlank &&
                        <option disabled value=''> -- select an option --</option>
                    }
                {
                    options.map(option => {
                        return <option key={option.value} className="p-2" value={option.value}>
                            {option.label}
                        </option>
                    })
                }
            </select>
        </>
    )
}

export default Select