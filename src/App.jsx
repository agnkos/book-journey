// import Header from "./Header"
import { NavLink } from "react-router-dom"

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-cyan-800">
        Hello world!
      </h1>
      <div className="flex flex-col items-center gap-4">
        <NavLink to='/login' className="px-4 py-2 bg-green-700 inline">Log In</NavLink>
        <NavLink to='/signup' className="px-4 py-2 bg-green-700 inline">Sign In</NavLink>
      </div>
    </>
  )
}

export default App
