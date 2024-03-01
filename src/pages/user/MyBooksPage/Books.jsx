import { Outlet, useLocation } from "react-router"
import { NavLink } from "react-router-dom"
// import { Suspense } from "react"
// import Loading from "../../../components/Loading"
// import { useContext, useEffect } from "react"
// import BookContext from "../../../context/BookContext"
// import AuthContext from '../../../context/AuthContext'

const Books = () => {
  const location = useLocation()
  // const { refreshBooks } = useContext(BookContext)
  // const { user } = useContext(AuthContext)

  // useEffect(() => {
  //   refreshBooks(user.token)
  // }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">My books</h1>
      <div className="flex gap-4 items-center text-xl mb-2">
        <NavLink to="read"
          className={({ isActive }) => `${(isActive || location.pathname === "/books" || location.pathname === "/books/") ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
        >read</NavLink>
        <NavLink to="reading"
          className={({ isActive }) => `${isActive ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
        >reading</NavLink>
        <NavLink to="toread"
          className={({ isActive }) => `${isActive ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
        >to read</NavLink>
      </div>
      <div className="py-3">
        {/* <Suspense fallback={<Loading />}> */}
          <Outlet />
        {/* </Suspense> */}
      </div>
    </div>
  )
}
export default Books