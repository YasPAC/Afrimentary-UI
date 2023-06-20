import { Link } from "react-router-dom";
import "./header.css";
import {RiMenu3Line, RiCloseLine} from "react-icons/ri";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

function Header() {
    const cookies = new Cookies();
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const {auth, setAuth} = useAuth();
    const user = cookies.get("public_id");
    const logOut = () => {
        cookies.remove("token", {path: "/", sameSite: "None", secure:true});
        cookies.remove("public_id", {path: "/", sameSite: "None", secure:true});
        cookies.remove("role", {path: "/", sameSite: "None", secure:true});
        setAuth({});
        navigate("/");
    }
    return (
        <header className="afrimentary__header">
            <nav className="afrimentary__nav">
                <div className="afrimentary__logo">
                    <h1>Afrimentary</h1>
                </div>
                <div className={showMenu ? "afrimentary__menu hide__menu" : "afrimentary__menu"}>
                    <div className="nav__menu">
                        <ul className="menu__items">
                            <li className="item"><Link to="/">Home</Link></li>
                            <li className="item"><Link to="/about">About</Link></li>
                            <li className="item"><Link to="/contact">Contact</Link></li>
                            {auth?.userId  ? <li className="item"><Link to={`/respondent/${auth?.userId}`}>Account</Link></li>:
                                null}
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