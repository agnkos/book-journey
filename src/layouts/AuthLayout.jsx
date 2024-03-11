import { useOutlet } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <AuthContextProvider>
            {outlet}
            <ToastContainer autoClose={2000} toastClassName='max-w-fit m-4 ml-auto' bodyClassName={() => 'flex px-4 items-center'} className='opacity-80' toastStyle={{ borderRadius: "0px" }} />
        </AuthContextProvider>
    )
}
