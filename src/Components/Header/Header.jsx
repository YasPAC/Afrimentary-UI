import { Link } from "react-router-dom";
import "./header.css";
import {RiMenu3Line, RiCloseLine} from "react-icons/ri";
import { useState } from "react";

function Header(){
    const [showMenu, setShowMenu] = useState(false);
    return (
        <header className="afrimentary__header">
            <nav className="afrimentary__nav">
                <div className="afrimentary__logo">
                    <h1>Afrimentary</h1>
                </div>
                {showMenu &&
                <div className="afrimentary__menu">
                    <div className="nav__menu">
                        <ul className="menu__items">
                            <li className="item"><Link to="/">Home</Link></li>
                            <li className="item"><Link to="/">About</Link></li>
                            <li className="item"><Link to="/">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="nav__btns">
                        <button className="btn btn-login"><Link to="/login">Login</Link></button>
                        <button className="btn btn-signup"><Link to="/">Sign up</Link></button>
                    </div>
                </div>}
                {showMenu ? <RiCloseLine color="white" size={30} onClick={() => {setShowMenu(!showMenu)}}/> :
            <RiMenu3Line color="white" size={30} onClick={() => {setShowMenu(!showMenu)}}/>}
            </nav>
        </header>
    )
}
export default Header;