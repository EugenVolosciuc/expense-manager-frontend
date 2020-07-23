import React from 'react'
import { useForm } from 'react-hook-form'

import BaseLayout from '../../components/layouts/BaseLayout.component'
import { Input, Button, Select } from '../../components/UI'
import useAuth from '../../components/contexts/AuthContext'
import { CURRENCIES } from '../../constants'

const SignUp = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const { loading, signUp } = useAuth() // TODO: add loader to btn

    const onSubmit = data => signUp({
        username: data.username,
        email: data.email,
        password: data.password,
        currency: data.currency
    })

    return (
        <BaseLayout>
            <div className="container mx-auto flex justify-center items-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col">
                    {/* TODO: add error inputs */}
                    <Input label="Username" name="username" hookRef={register({ required: true })} />
                    <Input label="Email" name="email" type="email" hookRef={register({ required: true })} />
                    <Input label="Password" name="password" type="password" hookRef={register({ required: true })} />
                    <Select
                        label="Currency"
                        name="currency"
                        hookRef={register({ required: true })}
                        options={Object.values(CURRENCIES).map(currency => ({ value: currency.tag, label: currency.label }))} />
                    <Button>Register</Button>
                </form>
            </div>
        </BaseLayout>
    )
}

export default SignUp