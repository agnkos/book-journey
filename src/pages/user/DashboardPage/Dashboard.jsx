import { useAuth } from "../../../hooks/useAuth";
import ReadingNow from "./components/ReadingNow";
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="p-4">
      <h1 className="mb-2 text-2xl">Hello, <br /><span className="text-3xl font-semibold">{user?.username}</span></h1>
      <ReadingNow />
      <button className="mt-6 px-4 py-2 text-center bg-lighter-accent hover:bg-main-accent text-light-bg rounded-md transition duration-15"
        onClick={() => toast.success('Book added')}
      >
        toastify
      </button>
    </div>
  )
}
export default Dashboard
