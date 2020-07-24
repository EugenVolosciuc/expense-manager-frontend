import React from 'react'
import { useForm } from 'react-hook-form'
import { useAlert } from 'react-alert'
import dayjs from 'dayjs'
import { isNil } from 'lodash'

import { Modal, Button, Input, InputError, DatePickerInput, Select } from '../UI'
import { API, requestErrorHandler } from '../../services'
import { EXPENSE_CATEGORIES } from '../../constants'

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const AddPaymentModal = ({ isOpen, handleClose }) => {
    const { register, handleSubmit, watch, errors } = useForm()
    const alert = useAlert()

    const onSubmit = async data => {
        const dataToSend = {
            amount: data.amount,
            paydate: dayjs(data.paydate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            details: data.details,
            category: data.category
        }

        try {
            await API.post('/payments', dataToSend)
            handleClose()
            alert.success('Payment created successfully')
            window.location.reload()
        } catch (error) {
            requestErrorHandler(error, alert)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            title={<span className="font-bold">Add payment</span>}
            footer={[
                <Button
                    onClick={handleSubmit(onSubmit)}>
                    Add payment
                </Button>
            ]}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col">
                <Input 
                    label="Title"
                    name="details"
                    hookRef={register({ required: 'Title is required' })} 
                />
                <InputError errors={errors} name="details" />
                <Select
                    defaultBlank
                    hookRef={register({ 
                        required: 'Category is required',
                        validate: {
                            notNil: value => !isNil(value) || 'You have to choose a category'
                        }
                    })}
                    name="category"
                    label="Category"
                    options={Object.values(EXPENSE_CATEGORIES).map(category => ({ value: category.tag, label: category.label }))}
                />
                <InputError errors={errors} name="category" />
                <Input
                    label="Amount"
                    name="amount"
                    hookRef={register({ required: 'Amount is required' })}
                />
                <InputError errors={errors} name="amount" />
                <DatePickerInput
                    name="paydate"
                    label="Pay date"
                    hookRef={register({ required: 'Pay date is required' })}
                />
                <InputError errors={errors} name="paydate" />
            </form>
        </Modal>
    )
}

export default AddPaymentModal