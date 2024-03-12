import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation, useOutlet } from "react-router-dom";

type User = {
    id: string,
    username: string,
    email: string,
    roles: string[],
    token: string
}

export const AuthRequired = () => {
    const { user } = useAuth();
    const location = useLocation();
    const outlet = useOutlet()

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
