import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import { Account, About, Homepage, Login, Register, Dashboard } from '../pages'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from '../components/contexts/AuthContext'


const Routes = () => {
    return (
        <Router>
            <AuthProvider>
                <Route exact path="/" component={Homepage} />
                <Route path="/about" component={About} />
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/register" component={Register} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/account" component={Account} />
            </AuthProvider>
        </Router>
    )
}

export default Routes