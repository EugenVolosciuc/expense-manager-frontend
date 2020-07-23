import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import API from '../../services/api'
import useAuth from '../contexts/AuthContext'

const Navbar = () => {
    const [showDropdownMenu, setShowDropdownMenu] = useState(false)
    const { user, logout } = useAuth()

    const loggedInMenuItems = (
        <>
            <li className="mx-4 py-3 lg:py-0 text-white"><Link to="/dashboard">Dashboard</Link></li>
            <li className="mx-4 py-3 lg:py-0 text-white"><Link to="/account">Account</Link></li>
            <li className="mx-4 py-3 lg:py-0 text-white"><span className="cursor-pointer" onClick={logout}>Log out</span></li>
        </>
    )

    const loggedOutMenuItems = (
        <>
            <li className="mx-4 py-3 lg:py-0 text-white"><Link to="/about">About</Link></li>
            <li className="mx-4 py-3 lg:py-0 text-white"><Link to="/auth/login">Log in</Link></li>
            <li className="mx-4 py-3 lg:py-0 text-white"><Link to="/auth/register">Sign up</Link></li>
        </>
    )

    const getLoggedInNav = () => {
        return <>
            <Link to="/dashboard"><h3 className="text-2xl font-bold text-white">Expense Manager</h3></Link>
            <ul className="hidden lg:flex items-center">{loggedInMenuItems}</ul>
            <button onClick={() => setShowDropdownMenu(!showDropdownMenu)} className={`inline-block lg:hidden focus:outline-none hamburger hamburger--spin ${showDropdownMenu ? 'is-active' : null}`} type="button">
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>
            <div
                className={`bg-main absolute right-0 rounded-bl rounded-br p-2 ${showDropdownMenu ? 'block' : 'hidden'} lg:hidden`}
                style={{ top: 68 }}>
                <ul>{loggedInMenuItems}</ul>
            </div>
        </>
    }

    const getLoggedOutNav = () => {
        return <>
            <Link to="/dashboard"><h3 className="text-2xl font-bold text-white">Expense Manager</h3></Link>
            <ul className="hidden lg:flex items-center">{loggedOutMenuItems}</ul>
            <button onClick={() => setShowDropdownMenu(!showDropdownMenu)} className={`inline-block lg:hidden focus:outline-none hamburger hamburger--spin ${showDropdownMenu ? 'is-active' : null}`} type="button">
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>
            <div
                className={`bg-main absolute right-0 rounded-bl rounded-br p-2 ${showDropdownMenu ? 'block' : 'hidden'} lg:hidden`}
                style={{ top: 68 }}>
                <ul>{loggedOutMenuItems}</ul>
            </div>
        </>
    }

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-main relative">
            {/* <UserConsumer>
                {({ user }) => {

                }}
            </UserConsumer> */}
            {user
                ? getLoggedInNav()
                : getLoggedOutNav()
            }
        </nav>
    )
}

export default Navbar