import { useState } from "react"

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' })

  const handleLoginChange = ({ target }) => {
    setLoginData({ ...loginData, [target.name]: target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    try {
      fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/api/login', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
      .then(response => response.json())
      .then(data => console.log(data))

      // tu set authorization (token) - żądanie do backendu
      // set user z auth w stanie aplikacji
      // setLoginData({ username: '', password: '' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-center mb-4 font-bold">Log in</h1>
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

        <button type="submit" className="bg-cyan-800 text-neutral-100 py-1 px-4 rounded">Sign Up</button>
      </form>
    </div>
  )
}
export default Login