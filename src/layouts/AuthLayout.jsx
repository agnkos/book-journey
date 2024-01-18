import { useOutlet } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
// import { useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";

export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <AuthContextProvider>
            {outlet}
        </AuthContextProvider>
    )
}