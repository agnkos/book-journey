import { useAuth } from "../../../hooks/useAuth";
import ReadingNow from "./components/ReadingNow";

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="p-4">
      <h1 className="mb-2 text-2xl">Hello, <br /><span className="text-3xl font-semibold">{user?.username}</span></h1>
      <ReadingNow />
    </div>
  )
}
export default Dashboard