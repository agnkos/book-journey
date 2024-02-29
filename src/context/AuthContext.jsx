import { createContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import authService from '../services/auth'

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('loggedBookJourneyUser', null)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('local', window.localStorage.getItem('loggedBookJourneyUser'))
    })

    const login = async (loginData, { setErrors = () => { } } = {}) => {

        await authService.login(loginData)
            .then(data => {
                console.log(data)
                setUser(data)
                window.localStorage.setItem('loggedBookJourneyUser', JSON.stringify(data))
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error)
                setErrors({ password: 'Invalid username or password' })
            })
    }

    const logout = async () => {
        await authService.logout()
            .then(() => {
                window.localStorage.removeItem('loggedBookJourneyUser')
                setUser(null)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const signup = async (newUser, { setStatus }) => {
        await authService.signup(newUser)
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

    const value = {
        user,
        setUser,
        login,
        logout,
        signup,
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
