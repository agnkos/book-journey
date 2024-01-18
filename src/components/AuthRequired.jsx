import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation, useOutlet } from "react-router-dom";
import { useEffect } from "react";

export const AuthRequired = () => {
    const { user } = useAuth();
    const location = useLocation();
    const outlet = useOutlet()

    useEffect(() => {
        console.log('user from authrequired', user)
    }, [user])

    if (!user) {
        return (<Navigate
            to='/login'
            state={{
                message: "You must log in first",
                from: location.pathname
            }}
            replace
        />)
    }
    return outlet;
}
