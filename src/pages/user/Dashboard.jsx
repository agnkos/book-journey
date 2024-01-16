import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

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
    console.log(user)
  }, [user])

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, {user?.username}</p>
      <p>First name: {userData?.firstName}</p>
      <p>Last name: {userData?.lastName}</p>
      <p>Account created: {userData?.accountCreated}</p>
      <button onClick={logout} className="py-1 px-2  text-neutral-50 bg-emerald-500">Log out</button>
    </div>
  )
}
export default Dashboard