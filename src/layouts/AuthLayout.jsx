import { useOutlet } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { BookContextProvider } from "../context/BookContext";
// import { useEffect } from "react";
// import { useAuth } from "../hooks/useAuth";

export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <AuthContextProvider>
            <BookContextProvider>
                {outlet}
            </BookContextProvider>
        </AuthContextProvider>
    )
}