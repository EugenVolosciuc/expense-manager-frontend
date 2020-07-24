import React, { useState, useEffect } from 'react'
import { isNull, get, isEmpty } from 'lodash'
import dayjs from 'dayjs'

import { Card, Empty, Loader, Tooltip } from '../UI'
import AddPaymentModal from '../modals/AddPaymentModal.component'
import useAuth from '../contexts/AuthContext'
import API from '../../services/api'
import { CURRENCIES, EXPENSE_CATEGORIES } from '../../constants'

const MonthPaymentsCard = () => {
    const [paymentsData, setPaymentsData] = useState({})
    const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)
    const [loadingPayments, setLoadingPayments] = useState(false)

    const currentTime = dayjs()
    const { user, userIsLoading } = useAuth()

    const showLoader = userIsLoading || loadingPayments

    useEffect(() => {
        (async () => {
            try {
                setLoadingPayments(true)
                const response = await API.get('/payments', {
                    params: {
                        filterBy: {
                            date: currentTime.format('YYYY-MM')
                        },
                        withTotal: true
                    }
                })

                if (!isEmpty(response.data)) setPaymentsData(response.data)
            } catch (error) {
                console.log(error) // No need to show the alert box
            }
            setLoadingPayments(false)
        })()
    }, [])


    return (
        <>
            <AddPaymentModal
                isOpen={!!showAddPaymentModal}
                handleClose={() => setShowAddPaymentModal(!showAddPaymentModal)}
            />
            <Card
                className="lg:h-full"
                title={
                    <>
                        <span className="font-bold mr-2">Payments</span>
                        <span className="text-gray-600">({currentTime.startOf('month').format('D')} - {currentTime.endOf('month').format('D MMMM')})</span>
                    </>
                }
                extra={<i onClick={() => setShowAddPaymentModal(!showAddPaymentModal)} className="fas fa-plus cursor-pointer hover:text-accent"></i>}
                footerContent={
                    !showLoader && !isEmpty(paymentsData) &&
                    <div className="flex justify-between w-full">
                        <span className="font-bold">Total:</span>
                        <span className={`font-bold ${paymentsData.payments.length > 5 ? 'mr-3' : ''}`}>{paymentsData.total} {CURRENCIES[user.currency].currencyPlural}</span>
                    </div>
                }
            >
                {
                    showLoader &&
                    <div className="p-8 text-center">
                        <Loader size="fa-2x" />
                    </div>
                }
                {
                    !showLoader && !isEmpty(paymentsData) &&
                    <ul>
                        {
                            paymentsData.payments.map(payment => (
                                <li
                                    className="border-b border-gray-200 py-4"
                                    key={payment._id}>
                                    <div className="flex justify-between">
                                        <div>
                                            {get(payment, 'expense.title', null) || payment.details}
                                        </div>
                                        <div>
                                            <span className="mr-4">{payment.amount} {payment.amount === 1 ? CURRENCIES[user.currency].currencySingular : CURRENCIES[user.currency].currencyPlural}</span>
                                            <span>
                                                <Tooltip
                                                    id={`Tooltip for paymentID - ${payment._id}`}
                                                    togglerElement={<i className={`relative ${EXPENSE_CATEGORIES[payment.category].icon}`} />}
                                                    tooltipContent={
                                                        <p>{EXPENSE_CATEGORIES[payment.category].label}</p>
                                                    }
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                }
                {!showLoader && isEmpty(paymentsData) && <Empty textClassName="text-center" message="No payments found. Try adding one in the right corner above." />}
            </Card>
        </>
    )
}

export default MonthPaymentsCard