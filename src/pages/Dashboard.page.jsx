import React, { useEffect } from 'react'

import BaseLayout from '../components/layouts/BaseLayout.component'
import ExpensesCard from '../components/cards/ExpensesCard.component'
import MonthPaymentsCard from '../components/cards/MonthPaymentsCard.component'

const Dashboard = ({ user }) => { 
    useEffect(() => {
        // TODO: change innerStyle height on screen resize
    }, [])

    return (
        <BaseLayout user={user} className="bg-gray-200" innerStyle={{ height: 'calc(100vh - 68px)'}}>
            <div className="h-full grid lg:grid-cols-2 lg:grid-rows-2 gap-6">
                <ExpensesCard />
                <MonthPaymentsCard />
            </div>
        </BaseLayout>
    )
}

export default Dashboard