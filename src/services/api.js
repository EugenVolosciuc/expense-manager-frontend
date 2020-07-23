import axios from 'axios'
import Cookies from 'js-cookie'

axios.interceptors.request.use(req => {
    const token = Cookies.get('EAauthToken')

    if (token) {
        req.headers.authorization = `Bearer ${token}`
        return req
    }

    return req
})

console.log("process.env.NODE_ENV", process.env.NODE_ENV)

export default axios.create({
    baseURL: process.env.NODE_ENV === "production" ? 'https://ev-expense-manager-api.herokuapp.com' : 'http://localhost:3001',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})