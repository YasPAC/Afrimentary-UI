import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isExpired } from "react-jwt";
import Cookies from "universal-cookie";

const RequireAuth = ({roles}) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const role = cookies.get("role");
    const location = useLocation();
    let expired;
    const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

    if (token) {
        expired = isExpired(token, SECRET_KEY);
    };
   
    return (
        token ?
            !expired ? roles?.includes(role) ? <Outlet />  :
            <Navigate to="/unauthorized" state = {{from: location}} replace/> :
            <Navigate to="/login" state = {{from: location}} replace/>
        :
        <Navigate to="/login" state = {{from: location}} replace/>

    );
}

export default RequireAuth;