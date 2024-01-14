import { useAuth } from "../../hooks/useAuth"

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, {user.username}</p>
      <button onClick={logout} className="py-1 px-2  text-neutral-50 bg-emerald-500">Log out</button>
    </div>
  )
}
export default Dashboard