import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import ShelfImg from '../img/shelf.jpg';

const Signup = () => {
    const [newUser, setNewUser] = useState({
        'username': '',
        'password': '',
        'email': '',
        'firstName': '',
        'lastName': ''
    })
    const { signup } = useAuth()

    const handleUserChange = ({ target }) => {
        setNewUser({ ...newUser, [target.name]: target.value })
    }

    const handleSignup = (e) => {
        e.preventDefault()
        signup(newUser)
    }

    useEffect(() => {
        console.log(newUser)
    })

    return (
        <div className="h-screen flex flex-col px-8 pt-16 pb-8 text-center bg-light-bg">
            <h1 className="text-center mb-4 font-bold">Signup</h1>
            <form onSubmit={handleSignup} className="flex flex-col items-center gap-4">
                <input
                    type="email"
                    value={newUser.email}
                    name="email"
                    onChange={handleUserChange}
                    id='email'
                    placeholder="Email"
                    className="border"
                />
                <input
                    type="text"
                    value={newUser.firstName}
                    name="firstName"
                    onChange={handleUserChange}
                    id='firstName'
                    placeholder="First name"
                    className="border"
                />
                <input
                    type="text"
                    value={newUser.lastName}
                    name="lastName"
                    onChange={handleUserChange}
                    id='lastName'
                    placeholder="Last name"
                    className="border"
                />
                <input
                    type="text"
                    value={newUser.username}
                    name="username"
                    onChange={handleUserChange}
                    id='username'
                    placeholder="Username"
                    className="border"
                />
                <input
                    type="password"
                    value={newUser.password}
                    name="password"
                    onChange={handleUserChange}
                    id='password'
                    placeholder="Password"
                    className="border"
                />
                <input
                    type="password"
                    value={newUser.repeatPassword}
                    name="repeatPassword"
                    onChange={handleUserChange}
                    id='repeatPassword'
                    placeholder="Confirm password"
                    className="border"
                />
                <button type="submit" className="bg-cyan-800 text-neutral-100 py-1 px-4 rounded">Sign Up</button>
            </form>
        </div>
    )
}
export default Signup