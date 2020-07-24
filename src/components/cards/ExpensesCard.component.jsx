import React, { useState } from 'react'
import { isNull, get, isEmpty } from 'lodash'
import useSWR, { mutate } from 'swr'

import { Card, Empty, Loader } from '../UI'
import AddExpenseModal from '../modals/AddExpenseModal.component'
import AddExpensePaymentModal from '../modals/AddExpensePaymentModal.component'
import ExpensePaymentsCalendarModal from '../modals/ExpensePaymentsCalendarModal.component'
import useAuth from '../contexts/AuthContext'
import API from '../../services/api'
import { PAYMENT_STATS } from '../../constants'

const ExpensesCard = () => {
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const [showAddExpensePaymentModal, setShowAddExpensePaymentModal] = useState(null)
    const [showExpensePaymentsCalendarModal, setShowExpensePaymentsCalendarModal] = useState(null)

    const { user, userIsLoading } = useAuth()
    const { data: { data: expenses } = {}, isValidating } = useSWR(userIsLoading ? false : '/expenses/stats', API.get)

    const showLoader = isValidating || userIsLoading

    const toggleModal = (setter, id) => {
        if (id) {
            setter(id)
        } else {
            setter(null)
        }
    }

    const renderPaymentStatus = paymentStatus => {
        switch (paymentStatus) {
            case PAYMENT_STATS.PAYED:
                return <><i className="fas fa-check mr-2 text-main"></i><span className="mr-4">Payed</span></>
            case PAYMENT_STATS.NOT_PAYED:
                return <><i className="fas fa-times mr-2 text-red-400"></i><span className="mr-4">Past due date</span></>
            case PAYMENT_STATS.TO_BE_PAYED:
                return <><i className="fas fa-exclamation mr-2 text-yellow-400"></i><span className="mr-4">To be payed</span></>
        }
    }

    return (
        <>
            <AddExpensePaymentModal
                expense={!isEmpty(expenses) && expenses.find(expense => expense._id === showAddExpensePaymentModal)}
                isOpen={!!showAddExpensePaymentModal}
                handleClose={() => toggleModal(setShowAddExpensePaymentModal)}
            />
            <ExpensePaymentsCalendarModal
                expense={!isEmpty(expenses) && expenses.find(expense => expense._id === showExpensePaymentsCalendarModal)}
                isOpen={!!showExpensePaymentsCalendarModal}
                handleClose={() => toggleModal(setShowExpensePaymentsCalendarModal)}
            />
            <AddExpenseModal
                isOpen={showAddExpenseModal}
                handleClose={() => setShowAddExpenseModal(!showAddExpenseModal)}
            />
            <Card
                className="lg:h-full"
                title={<span className="font-bold">Expense types</span>}
                extra={<i onClick={() => setShowAddExpenseModal(!showAddExpenseModal)} className="fas fa-plus cursor-pointer hover:text-accent"></i>}>
                {
                    showLoader && 
                    <div className="p-8 text-center">
                        <Loader size="fa-2x"/>
                    </div>
                }
                {
                    !showLoader && !isEmpty(expenses) &&
                    <ul>
                        {
                            expenses.map(expense => (
                                <li
                                    className="border-b border-gray-200 py-4"
                                    key={expense._id}>
                                    <div className="flex justify-between">
                                        <span>
                                            {expense.title}
                                        </span>
                                        <span>
                                            {renderPaymentStatus(expense.paymentStatus)}
                                            <i
                                                onClick={() => toggleModal(setShowAddExpensePaymentModal, expense._id)}
                                                className="fas fa-plus cursor-pointer mr-4 hover:text-accent" />
                                            <i
                                                onClick={() => toggleModal(setShowExpensePaymentsCalendarModal, expense._id)}
                                                className="fas fa-calendar-alt cursor-pointer hover:text-accent" />
                                        </span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                }
                { !showLoader && isEmpty(expenses) && <Empty textClassName="text-center" message="No expenses found. Try adding one in the right corner above." />}
            </Card>
        </>
    )
}

export default ExpensesCard