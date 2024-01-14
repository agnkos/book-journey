import { useOutlet } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";

export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <AuthContextProvider>
            {outlet}
        </AuthContextProvider>
    )
}