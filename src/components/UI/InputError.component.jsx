import React from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { isEmpty } from 'lodash'

const InputError = ({ name, errors }) => {
    return (
        <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p className="-mt-2 mb-4 text-red-400 text-sm">{message}</p>} />
    )
}

export default InputError