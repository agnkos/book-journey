import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

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
    <div className="p-10">
      <h1 className="text-center mb-4 font-bold">Log in</h1>
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
          className="border"
        />
        <input
          type="password"
          value={loginData.password}
          name="password"
          onChange={handleLoginChange}
          id='password'
          placeholder="Password"
          className="border"
        />

        <button type="submit" className="bg-cyan-800 text-neutral-100 py-1 px-4 rounded">Log In</button>
      </form>
    </div>
  )
}
export default Login