import "./home.css"
import { Header, ExpanderSection } from "../../Components";
import {RiTwitterFill, RiLinkedinBoxFill, RiInstagramFill} from "react-icons/ri";
import { Link } from "react-router-dom";
import heroBg from "../../assets/hero-bg.jpg";

function Home() {
    const date = new Date();
    return (
        <main className="afrimentary__home">
            <Header />
            <div className="afrimentary__hero">
                <img className="hero__bg" src={heroBg} alt="afrimentary-hero-bg"/>
                <div className="hero__bg-cover"></div>
                <h2 className="hero__heading">
                    <span className="heading heading-primary">Harnessing </span>
                    <span className="heading heading-whites">African </span>
                    <span className="heading heading-primary">insights, </span>
                    <span className="heading heading-primary">Amplifying </span>
                    <span className="heading heading-whites">African </span>
                    <span className="heading heading-primary heading-last">voices</span>
                </h2>
            </div>
            <div className="afrimentary__brief">
                <p className="mission__brief">
                    We bridge the gap between knowledge creation and <br />harnessing insights!
                </p>
            </div>
            <div className="afrimentary__mission">
                <div className="mission_sidebar">
                    <p>Afrimentary:</p>
                </div>
                <div className="mission__main">
                    <p>
                        We are a cutting-edge online platform that revolutionizes 
                        the way academic quantitative surveys are conducted in Africa.
                        Our mission is to connect researchers with Africa based respondents, 
                        empowering both sides to collaborate and contribute to  valuable research.
                    </p>
                </div>
            </div>
            <div className="afrimentary__how">
                <div className="how__title">
                    <p>How it works</p>
                </div>
                <div className="how__text">
                    <p>
                        <span className="how__text-dark">Respond to academic <br /> surveys, get </span>
                        <span className="how__text-greens">paid!</span>
                    </p>
                </div>
                <div className="how__cta">
                    <p>Register today!</p>
                    <button className="cta__btn"><Link to="/signup">Sign Up</Link></button>
                </div>
            </div>
            <div className="afrimentary__faq">
                <div className="faq_title">
                    <p>FAQs</p>
                </div>
                <ExpanderSection />
            </div>
            <div className="home__footer">
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
                    <span>Copyright © {date.getFullYear()} </span>
                    <span><Link to="/terms">Terms and conditions</Link></span>
                </div>
            </div>
        </main>
    )
}

export default Home;