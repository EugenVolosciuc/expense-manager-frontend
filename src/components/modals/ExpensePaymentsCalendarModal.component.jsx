import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'

import { Modal, Tooltip } from '../UI'
import { API } from '../../services'
import { isEmpty } from 'lodash'

const ExpensePaymentsCalendarModal = ({ expense, isOpen, handleClose }) => {
    const [activeStartDate, setActiveStartDate] = useState(dayjs().startOf('month').toDate())
    const [payments, setPayments] = useState({})

    useEffect(() => {
        if (!expense) return

        (async () => {
            try {
                const response = await API.get('/payments', {
                    params: {
                        expenseID: expense._id,
                        filterBy: {
                            date: dayjs(activeStartDate).format('YYYY-MM')
                        }
                    }
                })

                if (!isEmpty(response.data)) setPayments(response.data)
            } catch (error) {
                console.log(error) // No need to show the alert box
            }

        })()
    }, [activeStartDate])

    if (!expense) return null

    const checkIfPaymentDoneThisDay = day => {
        return payments.find(payment => {
            return dayjs(payment.paydate).isSame(dayjs(day), 'day')
        })
    }

    return (
        <Modal
            width={900}
            isOpen={isOpen}
            handleClose={handleClose}
            title={<span className="font-bold">Payments for {expense.title} Calendar</span>}
        >
            <Calendar
                tileClassName={details => {
                    if (!isEmpty(payments)) {
                        const paymentDoneThisDay = checkIfPaymentDoneThisDay(details.date)
                        if (paymentDoneThisDay) return 'bg-main text-white relative'
                    }
                }}
                tileContent={details => {
                    if (!isEmpty(payments)) {
                        const paymentDoneThisDay = checkIfPaymentDoneThisDay(details.date)
                        if (paymentDoneThisDay) {
                            return <>
                                <Tooltip
                                    forCalendar
                                    id={paymentDoneThisDay._id}
                                    togglerElement={<p></p>}
                                    tooltipContent={
                                        <div className="flex flex-col text-left">
                                            <p>Amount: {paymentDoneThisDay.amount}</p>
                                            {paymentDoneThisDay.details && <p>Details: {paymentDoneThisDay.details}</p>}
                                        </div>
                                    }
                                />
                            </>
                        }
                    }
                }}
                onActiveStartDateChange={(details) => setActiveStartDate(details.activeStartDate)}
                activeStartDate={activeStartDate}
                view="month"
                className="w-full border-0"
            />
        </Modal>
    )
}

export default ExpensePaymentsCalendarModal