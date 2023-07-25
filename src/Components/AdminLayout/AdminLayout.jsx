import "./adminlayout.css";
import {AdminSidebar} from "..";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { DocTitle } from "../../Utilities";
const AdminLayout = () => {
    const cookies = new Cookies();
    const {setAuth} = useAuth();
    useEffect(() => {
        const token = cookies.get("token");
        const user = cookies.get("public_id");
        const role = cookies.get("role");
        setAuth({userId: user, token: token, role: role});
    }, []);
    DocTitle("Admin");
    return (
        <main className="admin__pages">
            <AdminSidebar />
            <Outlet />
        </main>
    )
}

export default AdminLayout;