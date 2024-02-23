import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import userService from '../services/user'
// import axios from 'axios';

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('loggedBookJourneyUser', null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('local', window.localStorage.getItem('loggedBookJourneyUser'))
    })

    const login = async (loginData, { setErrors = () => { } } = {}) => {

        await userService.login(loginData)
            .then(data => {
                console.log(data)
                setUser(data)
                setUserLoggedIn(true)
                window.localStorage.setItem('loggedBookJourneyUser', JSON.stringify(data))
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error)
                setErrors({ password: 'Invalid username or password' })
            })
    }

    const logout = async () => {
        await userService.logout()
            .then(() => {
                window.localStorage.removeItem('loggedBookJourneyUser')
                setUser(null)
                setUserLoggedIn(false)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const signup = async (newUser, { setStatus }) => {
        await userService.signup(newUser)
            .then(() => {
                login({ username: newUser.username, password: newUser.password })
            })
            .catch((error) => {
                if (error.response.data.message === "Error: Username is already taken!") {
                    setStatus('Username already exists');
                } else if (error.response.data.message === "Error: Email is already in use!") {
                    setStatus('Email already exists');
                } else {
                    setStatus('An unexpected error occurred');
                }
            })
    }

    useEffect(() => {
        console.log('token from autcontext', user?.token)
    }, [user?.token])

    const value = {
        user,
        setUser,
        login,
        logout,
        signup,
        userLoggedIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
