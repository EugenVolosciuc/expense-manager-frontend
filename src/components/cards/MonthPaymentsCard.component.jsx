import React, { useState, useEffect } from 'react'
import { isNull, get, isEmpty } from 'lodash'
import Skeleton from 'react-loading-skeleton'
import dayjs from 'dayjs'

import { Card, Empty } from '../UI'
import AddPaymentModal from '../modals/AddPaymentModal.component'
import useAuth from '../contexts/AuthContext'
import API from '../../services/api'
import { CURRENCIES } from '../../constants'

const MonthPaymentsCard = () => {
    const [paymentsData, setPaymentsData] = useState({})
    const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)

    const currentTime = dayjs()
    const { user, userIsLoading } = useAuth()

    const showSkeleton = userIsLoading

    useEffect(() => {
        (async () => {
            try {
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
                extra={<i aria-hidden onClick={() => setShowAddPaymentModal(!showAddPaymentModal)} className="fas fa-plus cursor-pointer hover:text-accent"></i>}
                footerContent={
                    !showSkeleton && !isEmpty(paymentsData) &&
                    <div className="flex justify-between w-full">
                        <span className="font-bold">Total:</span>
                        <span className={`font-bold ${paymentsData.payments.length > 5 ? 'mr-3' : ''}`}>{paymentsData.total} {CURRENCIES[user.currency].currencyPlural}</span>
                    </div>
                }
            >
                {
                    showSkeleton && <Skeleton height={40} count={5} />
                }
                {
                    !showSkeleton && !isEmpty(paymentsData) &&
                    <ul>
                        {
                            paymentsData.payments.map(payment => (
                                <li
                                    className="border-b border-gray-200 py-4"
                                    key={payment._id}>
                                    <div className="flex justify-between">
                                        <span>
                                            {get(payment, 'expense.title', null) || payment.details}
                                        </span>
                                        <span>
                                            {payment.amount} {payment.amount === 1 ? CURRENCIES[user.currency].currencySingular : CURRENCIES[user.currency].currencyPlural}
                                        </span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                }
                {!showSkeleton && isEmpty(paymentsData) && <Empty message="No payments found. Try adding one in the right corner above." />}
            </Card>
        </>
    )
}

export default MonthPaymentsCard