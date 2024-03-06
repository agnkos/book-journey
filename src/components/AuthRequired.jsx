import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation, useOutlet } from "react-router-dom";

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
