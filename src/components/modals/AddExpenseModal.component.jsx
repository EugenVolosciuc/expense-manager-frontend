import React from 'react'
import { useForm } from 'react-hook-form'
import { isNil } from 'lodash'
import { useAlert } from 'react-alert'
import { mutate } from 'swr'

import { Modal, Input, Button, Select, Checkbox, InputError } from '../UI'
import { API, requestErrorHandler } from '../../services'
import { EXPENSE_CATEGORIES } from '../../constants'

const AddExpenseModal = ({ isOpen, handleClose }) => {
    const { register, handleSubmit, watch, errors } = useForm()
    const alert = useAlert()

    const onSubmit = async data => {
        const dataToSend = {
            title: data.title,
            type: data.type,
            recurrent: data.is_recurrent,
            category: data.category,
            ...(data.is_recurrent && { amount: data.amount, payday: data.payday }),
            ...(!isNil(data.remind_date) && { remindDate: data.remind_date })
        }

        try {
            await API.post('/expenses', dataToSend)
            handleClose()
            alert.success('Expense created successfully')
            mutate('/expenses/stats')
        } catch (error) {
            requestErrorHandler(error, alert)
        }
    }

    const isRecurrent = watch('is_recurrent')

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            title={<span className="font-bold">Add expense</span>}
            footer={[
                <Button
                    onClick={handleSubmit(onSubmit)}>
                    Add expense
                </Button>
            ]}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col">
                <Input label="Expense title" name="title" hookRef={register({ required: 'Title is required' })} />
                <InputError errors={errors} name="title" />
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
                <Select
                    defaultBlank
                    hookRef={register({ 
                        required: 'Payment period is required',
                        validate: {
                            notNil: value => !isNil(value) || 'You have to choose a payment period'
                        }
                    })}
                    name="type"
                    label="Payment period"
                    options={[
                        {
                            value: 'MONTHLY',
                            label: 'Monthly'
                        },
                        {
                            value: 'BIMONTHLY',
                            label: 'Bimonthly'
                        }
                    ]}
                />
                <InputError errors={errors} name="type" />
                <Checkbox
                    name="is_recurrent"
                    label="Recurrent expense"
                    hookRef={register}
                    checked={isRecurrent}
                />
                {
                    isRecurrent &&
                    <>
                        <Input
                            label="Amount"
                            name="amount"
                            hookRef={register({ required: 'Amount is required' })}
                        />
                        <InputError errors={errors} name="amount" />
                        <Input
                            label="Pay day"
                            type="number"
                            name="payday"
                            hookRef={register({ 
                                required: 'Pay day is required', 
                                min: { 
                                    value: 1,
                                    message: 'Pay day cannot be less than 1'
                                }, 
                                max: {
                                    value: 31,
                                    message: 'Pay day cannot be bigger than 31'
                                } 
                            })}
                        />
                        <InputError errors={errors} name="payday" />
                    </>
                }
                {
                    !isRecurrent &&
                    <>
                        <Input
                            label="Remind on date of month"
                            type="number"
                            name="remind_date"
                            hookRef={register({ 
                                required: 'Reminder date is required', 
                                min: { 
                                    value: 1, 
                                    message: 'Reminder date cannot be less than 1'
                                }, 
                                max: {
                                    value: 31,
                                    message: 'Reminder date cannot be bigger than 31'
                                } 
                            })}
                        />
                        <InputError errors={errors} name="remind_date" />
                    </>
                }
            </form>
        </Modal>
    )
}

export default AddExpenseModal