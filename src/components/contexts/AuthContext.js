import React, { useContext, useState, useEffect, createContext } from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import { isNull } from 'lodash'
import { cache } from 'swr'

import API from '../../services/api'

export const AuthContext = createContext()

const AuthProviderWithoutRouter = ({ children, history }) => {
    const [user, setUser] = useState(null)
    const [userIsLoading, setUserIsLoading] = useState(true)

    useEffect(() => {
        if (!isNull(user)) {
            const token = Cookies.get('EAauthToken')
            API.defaults.headers.Authorization = `Bearer ${token}`
            history.push('/dashboard')
        }
    }, [user, history])

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('EAauthToken')
            if (token) {
                API.defaults.headers.Authorization = `Bearer ${token}`
                try {
                    const { data: user } = await API.get('/users/me')
                    if (user) setUser(user)
                } catch (error) {
                    console.log(error)
                }
            }
            setUserIsLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const signUp = async data => {
        try {
            await API.post('/users', {...data})
            history.push('/auth/login')
        } catch (error) {
            console.log(error)
        }
    }

    const login = async (email, password) => {
        try {
            const { data: userData } = await API.post('/users/login', { email, password })
            const token = userData.token
            Cookies.set('EAauthToken', token, { expires: 2 })
            setUser(userData.user)
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await API.post('/users/logout')
            Cookies.remove('EAauthToken')
            cache.clear()
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, userIsLoading, logout, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = withRouter(AuthProviderWithoutRouter)