import React from 'react'
import { useForm } from 'react-hook-form'
import { useAlert } from 'react-alert'
import dayjs from 'dayjs'
import { isNil } from 'lodash'
import { mutate } from 'swr'

import { Modal, Button, Input, InputError, DatePickerInput, TextArea } from '../UI'
import { API, requestErrorHandler } from '../../services'

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const AddExpensePaymentModal = ({ expense, isOpen, handleClose }) => {
    const { register, handleSubmit, watch, errors } = useForm()
    const alert = useAlert()

    const onSubmit = async data => {
        const dataToSend = {
            expense: expense._id,
            amount: data.amount,
            paydate: dayjs(data.paydate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            category: expense.category,
            ...(!isNil(data.details) && { details: data.details })
        }

        try {
            await API.post('/payments', dataToSend)
            mutate('/expenses/stats')
            handleClose()
            alert.success('Payment created successfully')
            window.location.reload()
        } catch (error) {
            requestErrorHandler(error, alert)
        }
    }

    if (!expense) return null

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            title={<span className="font-bold">Add payment for {expense.title}</span>}
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
                <InputError errors={errors} name="paydate"/>
                <TextArea 
                    name="details"
                    label="Details"
                    hookRef={register}
                />
            </form>
        </Modal>
    )
}

export default AddExpensePaymentModal