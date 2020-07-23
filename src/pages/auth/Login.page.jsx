import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import BaseLayout from '../../components/layouts/BaseLayout.component'
import { Input, Button } from '../../components/UI'
import useAuth from '../../components/contexts/AuthContext'

const Login = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const { loading, login, isAuthenticated } = useAuth() // TODO: add loader to btn

    const onSubmit = data => login(data.email, data.password)

    return (
        <BaseLayout>
            <div className="container mx-auto flex justify-center items-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col">
                    {/* TODO: add error inputs */}
                    <Input label="Email" name="email" type="email" hookRef={register({ required: true })} />
                    <Input label="Password" name="password" type="password" hookRef={register({ required: true })} />
                    <Button>Log In</Button>
                </form>
            </div>
        </BaseLayout>
    )
}

export default Login