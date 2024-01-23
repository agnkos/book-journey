import { createContext } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('loggedBookJourneyUser', null)
    const navigate = useNavigate()

    const login = async (loginData, { setErrors = () => { } } = {}) => {
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
                throw new Error(errorData.detail)
                // setErrors({ password: 'Invalid username or password' })
                // if (errorData.detail === 'Invalid request content.') throw new Error('Invalid username or password')
            }

            const data = await response.json()
            setUser(data)
            window.localStorage.setItem('loggedBookJourneyUser', JSON.stringify(data))
            navigate('/dashboard')
        } catch (error) {
            if (error.detail === 'Invalid request content.') {
                setErrors({ password: 'Invalid username or password' })
            }
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
                throw new Error(errorData.message)
            }

            await response.json()
            // {message: 'User registered successfully!'}
            login({ username: newUser.username, password: newUser.password })
        } catch (error) {
            console.log(error)
            if (error.message === "Error: Username is already taken!") {
                setStatus('Username already exists');
            } else if (error.message === "Error: Email is already in use!") {
                setStatus('Email already exists');
            } else {
                setStatus('An unexpected error occurred');
            }
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
