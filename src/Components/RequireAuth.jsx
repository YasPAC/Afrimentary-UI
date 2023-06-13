import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();
    return (
        auth?.userId ? <Outlet /> : <Navigate to="/login" state = {{from: location}} replace/>
    );
}

export default RequireAuth;