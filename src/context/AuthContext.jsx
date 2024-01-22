import { createContext } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('loggedBookJourneyUser', null)
    const navigate = useNavigate()

    const login = async (loginData, { setErrors }) => {

        try {
            const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
                setErrors({ password: 'Invalid username or password' })
                if (errorData.detail === 'Invalid request content.') throw new Error('Invalid username or password')
                else throw new Error('Login failed')
            }

            const data = await response.json()
            setUser(data)
            window.localStorage.setItem('loggedBookJourneyUser', JSON.stringify(data))
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            setErrors({ password: 'Invalid username or password' })
        }
    }

    const logout = async () => {
        try {
            await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
            window.localStorage.removeItem('loggedBookJourneyUser')
            setUser(null)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const signup = async (newUser, { setStatus }) => {
        try {
            const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.detail === 'Invalid request content.') setStatus('User email already exists')
                console.log(errorData)
            }

            const data = await response.json()
            login({ username: data.username, password: data.password })
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        user,
        setUser,
        login,
        logout,
        signup
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
