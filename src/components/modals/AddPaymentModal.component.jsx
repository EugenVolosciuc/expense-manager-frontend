import React from 'react'
import { useForm } from 'react-hook-form'
import { useAlert } from 'react-alert'
import dayjs from 'dayjs'

import { Modal, Button, Input, InputError, DatePickerInput, TextArea } from '../UI'
import { API, requestErrorHandler } from '../../services'

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const AddPaymentModal = ({ isOpen, handleClose }) => {
    const { register, handleSubmit, watch, errors } = useForm()
    const alert = useAlert()

    const onSubmit = async data => {
        const dataToSend = {
            amount: data.amount,
            paydate: dayjs(data.paydate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            details: data.details
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