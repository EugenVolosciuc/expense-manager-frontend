import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { isNull, get, isEmpty } from 'lodash'
import {
    VerticalBarSeries,
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis
} from 'react-vis'

import { Card, Loader } from '../UI'
import API from '../../services/api'
import useAuth from '../contexts/AuthContext'
import { EXPENSE_CATEGORIES, CURRENCIES } from '../../constants'

const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)

const PaymentCategoryStatsCard = () => {
    const [payments, setPayments] = useState({})
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
                            date: [
                                currentTime.format('YYYY'),
                                currentTime.format('YYYY')
                            ]
                        }
                    }
                })

                if (!isEmpty(response.data)) {
                    const paymentsByMonthAndCategory = response.data.reduce((yearObject, payment) => {
                        const month = dayjs(payment.paydate).format('YYYY-MM')
                        if (yearObject[month]) {
                            if (yearObject[month][payment.category]) {
                                yearObject[month][payment.category].push(payment)
                            } else {
                                yearObject[month][payment.category] = []
                                yearObject[month][payment.category].push(payment)
                            }
                        } else {
                            yearObject[month] = {}
                            if (yearObject[month][payment.category]) {
                                yearObject[month][payment.category].push(payment)
                            } else {
                                yearObject[month][payment.category] = []
                                yearObject[month][payment.category].push(payment)
                            }
                        }
                        return yearObject
                    }, {})

                    for (let i = 1; i <= 12; i++) {
                        const currentMonthInLoop = dayjs(`${dayjs().format('YYYY')}-${i}`, 'YYYY-M').format('YYYY-MM')
                        if (!paymentsByMonthAndCategory[currentMonthInLoop]) {
                            paymentsByMonthAndCategory[currentMonthInLoop] = []
                        }
                    }

                    setPayments(paymentsByMonthAndCategory)
                }
            } catch (error) {
                console.log(error) // No need to show the alert box
            }
            setLoadingPayments(false)
        })()
    }, [])

    const paymentStats = Object.entries(payments)
        .map(([month, categories]) => {
            const categoriesData = Object.entries(categories).map(([category, paymentsInCategory]) => {
                const totalAmountInCategory = paymentsInCategory.reduce((accumulator, payment) => accumulator + payment.amount, 0)
                return {
                    totalAmountInCategory,
                    tag: category
                }
            })

            if (isEmpty(categoriesData)) return [{ x: parseInt(month.split('-')[1], 10), y: 0 }]

            return categoriesData.map(category => {
                return {
                    x: parseInt(month.split('-')[1], 10),
                    y: category.totalAmountInCategory,
                    categoryLabel: EXPENSE_CATEGORIES[category.tag].label,
                    color: EXPENSE_CATEGORIES[category.tag].chartColorCode
                }
            })
        })
        .sort((a, b) => {
            const aMonth = a[0].x
            const bMonth = b[0].x
            if (aMonth > bMonth) {
                return 1
            } else {
                return -1
            }
        })

    return (
        <Card
            className="lg:h-full"
            title={<span className="font-bold">Payments by categories</span>}>
            {
                showLoader &&
                <div className="p-8 text-center">
                    <Loader size="fa-2x" />
                </div>
            }
            {
                !showLoader && !isEmpty(payments) &&
                <div className="h-full flex justify-around align-middle">
                    <XYPlot 
                        width={800} 
                        height={300} 
                        stackBy="y" 
                        xType="ordinal"
                        colorRange={Object.values(EXPENSE_CATEGORIES).map(category => category.bgColor)}
                        colorDomain={Object.values(EXPENSE_CATEGORIES).map(category => category.chartColorCode)}>
                        <HorizontalGridLines />
                        <VerticalGridLines />
                        <XAxis />
                        <YAxis />
                        {
                            paymentStats.map((monthGroup, index) => {
                                return <VerticalBarSeries key={`month-${index}`} data={monthGroup} />
                            })
                        }
                    </XYPlot>
                </div>
            }
        </Card>
    )
}

export default PaymentCategoryStatsCard