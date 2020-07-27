import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import BaseLayout from '../../components/layouts/BaseLayout.component'
import { Input, Button, InputError } from '../../components/UI'
import useAuth from '../../components/contexts/AuthContext'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, errors } = useForm()
    const { loading, login, isAuthenticated } = useAuth() // TODO: add loader to btn

    const onSubmit = data => {
        setIsLoading(true)
        login(data.email, data.password)
        setIsLoading(false)
    }

    return (
        <BaseLayout>
            <div className="container mx-auto flex justify-center items-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col">
                    <Input label="Email" name="email" type="email" hookRef={register({ required: 'Email is required to log in' })} />
                    <InputError errors={errors} name="email" />
                    <Input label="Password" name="password" type="password" hookRef={register({ required: 'Password is required to log in' })} />
                    <InputError errors={errors} name="password" />
                    <Button loading={isLoading}>Log In</Button>
                </form>
            </div>
        </BaseLayout>
    )
}

export default Login