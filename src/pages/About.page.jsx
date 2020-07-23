import React from 'react'

import BaseLayout from '../components/layouts/BaseLayout.component'

const About = ({user}) => {
    return (
        <BaseLayout user={user}>
            <h1>About page</h1>
        </BaseLayout>
    )
}

export default About