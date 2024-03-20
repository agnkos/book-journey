import { useEffect, useState } from "react"
import userService from '../../../services/user'
import { useAuth } from "../../../hooks/useAuth"
import PasswordForm from "./components/PasswordForm"
import NameForm from "./components/NameForm"
// import axios from 'axios'

const Profile = () => {
  const [userData, setUserData] = useState()
  const [editUser, setEditUser] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const getUserData = async () => {
      // axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('loggedBookJourneyUser'))?.token}`
      const data = await userService.getUser()
      console.log('userdata', data)
      setUserData(data)
    }
    if (user.token) getUserData()
  }, [user.token])

  const handleEditUser = (bool) => {
    setEditUser(bool)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">Account details</h1>
      <div className="mb-2 max-w-fit pb-2 border-b-2 border-b-light-objects">
        <p>Username</p>
        <div className="flex items-center gap-8">
          <p className="text-xl">{userData?.username}</p>
        </div>
      </div>
      <NameForm userData={userData} setUserData={setUserData} editUser={editUser} handleEditUser={handleEditUser} />
      <div className="mb-2">
        <p>Email</p>
        <p className="text-xl">{userData?.email}</p>
      </div>
      <div className="mb-2">
        <p> Account created</p>
        <p className="text-xl">{userData?.accountCreated}</p>
      </div >
      <h2 className="mt-4 text-xl font-semibold mb-2">Change password</h2>
      <PasswordForm />
    </div >
  )
}
export default Profile