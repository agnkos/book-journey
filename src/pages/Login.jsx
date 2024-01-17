import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import ShelfImg from '../img/shelf.jpg';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const { login } = useAuth();
  const location = useLocation();

  const handleLoginChange = ({ target }) => {
    setLoginData({ ...loginData, [target.name]: target.value })
  }

  // dodać async await?
  const handleLogin = (e) => {
    e.preventDefault()
    login(loginData)
    setLoginData({ username: '', password: '' })
  }

  return (
    <div className="h-screen flex flex-col justify-center px-8 py-6 text-center bg-light-bg">
      <img src={ShelfImg} alt="a shelf with books illustration" className="max-w-full max-h-[35%] mx-auto" />
      <h1 className="text-4xl max-[320px]:text-3xl mb-2 font-bold text-main-accent">
        BookJourney
      </h1>
      <p className="text-xl font-medium mb-4">Log In</p>
      {location.state?.message &&
        <h3>{location.state.message}</h3>}
      <form onSubmit={handleLogin} className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={loginData.username}
          name="username"
          onChange={handleLoginChange}
          id='username'
          placeholder="Username"
          className="w-11/12 px-4 py-2 rounded-md border"
        />
        <input
          type="password"
          value={loginData.password}
          name="password"
          onChange={handleLoginChange}
          id='password'
          placeholder="Password"
          className="w-11/12 px-4 py-2 rounded-md border"
        />

        <button type="submit" className="w-11/12 px-4 py-2 mt-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md">Log In</button>
      </form>
      <p className="text-xs text-main-accent fixed bottom-4 left-2/4 -translate-x-2/4">Image by<a href="https://pl.freepik.com/darmowe-wektory/recznie-rysowane-ilustracja-kregoslupa-ksiazki-o-plaskiej-konstrukcji_24307294.htm#from_view=detail_serie">Freepik</a></p>
    </div>
  )
}
export default Login