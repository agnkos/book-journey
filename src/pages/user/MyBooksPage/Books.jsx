// import { useContext, useEffect } from "react"
import { useEffect } from "react"
import { Outlet, useLocation } from "react-router"
// import { useAuth } from "../../../hooks/useAuth"
import { NavLink } from "react-router-dom"
// import BookContext from "../../../context/BookContext"

const Books = () => {
  const location = useLocation()
  // const { user } = useAuth()
  // const { setBooks } = useContext(BookContext)

  // useEffect(() => {
  //   const getBooks = async () => {
  //     try {
  //       const response = await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/book/all_books', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${user.token}`
  //         }
  //       })
  //       const data = await response.json()
  //       console.log(data)
  //       setBooks(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getBooks()
  // }, [user.token, setBooks])

  useEffect(() => {
    console.log('location', location)
  }, [location])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">My books</h1>
      <div className="flex gap-4 items-center text-xl mb-2">
        <NavLink to="read"
          className={({ isActive }) => `${(isActive || location.pathname === "/books") ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
        >read</NavLink>
        <NavLink to="reading"
          className={({ isActive }) => `${isActive ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
        >reading</NavLink>
        <NavLink to="toread"
          className={({ isActive }) => `${isActive ? 'bg-link-active px-2 py-1 text-light-bg rounded-md transition duration-150' : 'bg-transparent'}`}
        >to read</NavLink>
      </div>
      <div className="py-3">
        <Outlet />
      </div>
    </div>
  )
}
export default Books