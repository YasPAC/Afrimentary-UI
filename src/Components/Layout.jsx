import { Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Cookies from "universal-cookie";
import { useEffect } from "react";

const Layout = () => {
    const cookies = new Cookies();
    const {setAuth} = useAuth();
    useEffect(() => {
        const token = cookies.get("token");
        const user = cookies.get("public_id");
        const role = cookies.get("role");
        setAuth({userId: user, token: token, role: role});
    }, []);
    return (
        <Outlet />
    )
}
export default Layout;