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
        <div className="h-screen max-h-screen flex flex-col justify-center px-8 py-6 text-center bg-light-bg">
            <img src={ShelfImg} className="mx-auto max-w-full max-h-[25%]" alt="a shelf with books illustration" />
            <h1 className="text-4xl max-[320px]:text-3xl mb-2 font-bold text-main-accent">
                BookJourney
            </h1>
            <p className="text-xl font-medium mb-4">Create an account</p>
            <form onSubmit={handleSignup} className="w-11/12 mx-auto flex flex-col items-center gap-4 max-w-md">
                <input
                    type="email"
                    value={newUser.email}
                    name="email"
                    onChange={handleUserChange}
                    id='email'
                    placeholder="Email"
                    className="w-11/12 px-4 py-2 rounded-md border"
                />
                {/* <input
                    type="text"
                    value={newUser.firstName}
                    name="firstName"
                    onChange={handleUserChange}
                    id='firstName'
                    placeholder="First name"
                    className="w-11/12 px-4 py-2 text-sm rounded-md border"
                    />
                    <input
                    type="text"
                    value={newUser.lastName}
                    name="lastName"
                    onChange={handleUserChange}
                    id='lastName'
                    placeholder="Last name"
                    className="w-11/12 px-4 py-2 text-sm rounded-md border"
                /> */}
                <input
                    type="text"
                    value={newUser.username}
                    name="username"
                    onChange={handleUserChange}
                    id='username'
                    placeholder="Username"
                    className="w-11/12 px-4 py-2 rounded-md border"
                />
                <input
                    type="password"
                    value={newUser.password}
                    name="password"
                    onChange={handleUserChange}
                    id='password'
                    placeholder="Password"
                    className="w-11/12 px-4 py-2  rounded-md border"
                />
                <input
                    type="password"
                    value={newUser.repeatPassword}
                    name="repeatPassword"
                    onChange={handleUserChange}
                    id='repeatPassword'
                    placeholder="Confirm password"
                    className="w-11/12 px-4 py-2 rounded-md border"
                />
                <button type="submit" className="w-11/12 px-4 py-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md">Sign Up</button>
            </form>
            <p className="text-xs text-main-accent fixed bottom-4 left-2/4 -translate-x-2/4">Image by<a href="https://pl.freepik.com/darmowe-wektory/recznie-rysowane-ilustracja-kregoslupa-ksiazki-o-plaskiej-konstrukcji_24307294.htm#from_view=detail_serie">Freepik</a></p>
        </div>
    )
}
export default Signup
