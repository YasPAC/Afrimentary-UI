import "./footer.css";
import {RiTwitterFill, RiLinkedinBoxFill, RiInstagramFill} from "react-icons/ri";
import { Link } from "react-router-dom";
const Footer = () => {
    const date = new Date();
    return (
        <section className="afrimentary__footer">
            <div className="footer__main">
                    <div className="footer__info">
                        <h2>Afrimentary,</h2>
                        <h3>
                            Harness your insights and get paid ♡
                        </h3>
                    </div>
                    <div className="footer__socials">
                        <RiTwitterFill color="rgb(19,85,11)" size={30}/>
                        <RiLinkedinBoxFill color="rgb(19,85,11)" size={30}/>
                        <RiInstagramFill color="rgb(19,85,11)" size={30}/>
                    </div>
            </div>
            <div className="copyright">
                <span>Copyright © {date.getFullYear()} | </span>
                <span><Link to="/terms">Terms and conditions</Link> | </span>
                <span className="dev">Built by Regan Muthomi</span>
            </div>
        </section>
    )
}

export default Footer;