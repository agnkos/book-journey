import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBookJourneyUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    const login = async (loginData) => {

        try {
            await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setUser(data)
                    console.log('user', user)
                    window.localStorage.setItem('loggedBookJourneyUser', JSON.stringify(data))
                    navigate('/dashboard')
                })

        } catch (error) {
            console.log(error)
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

    const signup = async (newUser) => {
        try {
            await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    login({ username: data.username, password: data.password })
                })
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        user,
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
