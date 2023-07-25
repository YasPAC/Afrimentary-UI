import { Link } from "react-router-dom";
import "./header.css";
import {RiMenu3Line, RiCloseLine} from "react-icons/ri";
import { useState, useEffect  } from "react";
import useAuth from "../../Hooks/useAuth";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import { isExpired } from "react-jwt";

function Header() {
    const cookies = new Cookies();
    const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const {auth, setAuth} = useAuth();
    // Logout function
    const logOut = () => {
        cookies.remove("token", {path: "/", sameSite: "None", secure:true});
        cookies.remove("public_id", {path: "/", sameSite: "None", secure:true});
        cookies.remove("role", {path: "/", sameSite: "None", secure:true});
        setAuth({});
        navigate("/");
    }
    // Logout out automatically if the token is expired
    useEffect (() => {
        if (auth.token) {
            const expired = isExpired(auth.token, SECRET_KEY);
            expired && logOut();
        }
    }, []);
    return (
        <header className="afrimentary__header">
            <nav className="afrimentary__nav">
                <div className="afrimentary__logo">
                    <Link to="/">Afrimentary</Link>
                </div>
                <div className={showMenu ? "afrimentary__menu hide__menu" : "afrimentary__menu"}>
                    <div className="nav__menu">
                        <ul className="menu__items">
                            <li className="item"><Link to="/">Home</Link></li>
                            <li className="item"><Link to="/about">About</Link></li>
                            <li className="item"><Link to="/contact">Contact</Link></li>
                            {auth?.userId  ? <li className="item"><Link to={auth?.role === "researcher" ? `/researcher/${auth?.userId}` : `/respondent/${auth?.userId}` }>Account</Link></li>:
                                null}
                            {auth?.role === "admin" && <li className="item"><Link to={`/admin/${auth?.userId}`}>Admin</Link></li>}
                        </ul>
                    </div>
                    <div className="nav__btns">
                        {!auth?.userId  ? <>
                            <button className="btn btn-signup"><Link to="/signup">Sign up</Link></button>
                            <button className="btn btn-login"><Link to="/login">Login</Link></button>
                            </> :
                            <button className="btn btn-logout" onClick={logOut}>Logout</button>
                        }
                    </div>
                </div>
                <div className="nav__hamburger">
                    {showMenu ? <RiCloseLine color="white" size={30} onClick={() => {setShowMenu(!showMenu)}}/> :
                    <RiMenu3Line color="white" size={30} onClick={() => {setShowMenu(!showMenu)}}/>}
                </div>
            </nav>
        </header>
    )
}
export default Header;