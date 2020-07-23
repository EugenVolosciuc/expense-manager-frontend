import React from 'react'

import BaseLayout from '../components/layouts/BaseLayout.component'

const Account = ({user}) => {
    return (
        <BaseLayout user={user}>
            <h1>Account</h1>
        </BaseLayout>
    )
}

export default Account