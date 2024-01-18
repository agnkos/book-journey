import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [userData, setUserData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://book-journey-app-54dba2b08eec.herokuapp.com/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },

      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setUserData(data)
        })
    }
    fetchData()
  }, [user.token])

  useEffect(() => {
    console.log('dashboard user', user)
  })

  return (
    <div className="p-4">
        <h1>Dashboard</h1>
      <p>Hello, {user?.username}</p>
      <p>First name: {userData?.firstName}</p>
      <p>Last name: {userData?.lastName}</p>
      <p>Account created: {userData?.accountCreated}</p>
      <button onClick={logout} className="py-1 px-2  text-neutral-50 bg-emerald-500">Log out</button>
      <NavLink to='/books'>link to books</NavLink>
    </div>
  )
}
export default Dashboard