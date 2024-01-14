import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState()
    const navigate = useNavigate()

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

    const logout = () => {
        window.localStorage.removeItem('loggedBookJourneyUser')
        setUser(null)
        navigate('/')
    }

    const value = {
        user,
        login,
        logout
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
