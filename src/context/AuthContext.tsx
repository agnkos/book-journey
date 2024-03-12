import { createContext, useEffect, PropsWithChildren } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import authService from '../services/auth'
import axios from 'axios'
import { UserType, LoginDataType, SignupUserType } from "../types";

type SetErrorsType = (errors: { password?: string } | null) => void;

type SetStatusType = {
    setStatus: (status: string) => void
}

type AuthContextType = {
    user: UserType,
    setUser: () => void,
    login: (loginData: LoginDataType, { setErrors }: { setErrors?: SetErrorsType }) => Promise<void>,
    logout: () => Promise<void>,
    signup: (newUser: SignupUserType, { setStatus }: SetStatusType) => Promise<void>,
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useLocalStorage('loggedBookJourneyUser', null)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('local', window.localStorage.getItem('loggedBookJourneyUser'))
    })

    const login = async (loginData: LoginDataType, { setErrors }: { setErrors?: SetErrorsType } = {}) => {

        await authService.login(loginData)
            .then(data => {
                console.log(data)
                setUser(data)
                window.localStorage.setItem('loggedBookJourneyUser', JSON.stringify(data))
                axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('loggedBookJourneyUser') ?? '')?.token}`
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error)
                if (setErrors) setErrors({ password: 'Invalid username or password' })
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

    const signup = async (newUser: SignupUserType, { setStatus }: SetStatusType) => {
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

    useEffect(() => {
        console.log('token from autcontext', user?.token)
    }, [user?.token])

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
