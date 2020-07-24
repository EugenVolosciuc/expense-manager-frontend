import React from 'react'
import { useForm } from 'react-hook-form'
import { isNil } from 'lodash'

import BaseLayout from '../../components/layouts/BaseLayout.component'
import { Input, Button, Select, InputError } from '../../components/UI'
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
                    <Input label="Username" name="username" hookRef={register({ required: 'Username is required' })} />
                    <InputError errors={errors} name="username" />
                    <Input label="Email" name="email" type="email" hookRef={register({ required: 'Email is required' })} />
                    <InputError errors={errors} name="email" />
                    <Input label="Password" name="password" type="password" hookRef={register({ required: 'Password is required' })} />
                    <InputError errors={errors} name="password" />
                    <Select
                        defaultBlank
                        label="Currency"
                        name="currency"
                        hookRef={register({ 
                            required: 'Currency is required',
                            validate: {
                                notNil: value => !isNil(value) || 'You have to choose a currency'
                            }
                        })}
                        options={Object.values(CURRENCIES).map(currency => ({ value: currency.tag, label: currency.label }))} 
                    />
                    <InputError errors={errors} name="currency" />
                    <Button>Register</Button>
                </form>
            </div>
        </BaseLayout>
    )
}

export default SignUp