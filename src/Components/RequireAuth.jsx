import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequireAuth = ({roles}) => {
    const {auth} = useAuth();
    const location = useLocation();
    return (
        roles?.includes(auth?.role) ?
            <Outlet /> 
            : auth?.userId ? 
                <Navigate to="/unauthorized" state = {{from: location}} replace/> :
                <Navigate to="/login" state = {{from: location}} replace/>
    );
}

export default RequireAuth;