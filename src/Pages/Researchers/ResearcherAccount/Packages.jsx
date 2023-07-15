import { Link } from "react-router-dom";
import custom from "../../../assets/custom.png";
import gold from "../../../assets/gold.png";
import silver from "../../../assets/silver.png";
import bronze from "../../../assets/bronze.png";

const Packages = () => {
    return (
        <section className="offered__packages">
            <div className="packages__header">
                <h3>Pricing</h3>
                <p>All our packages are paid for per survey.</p>
                <div className="custom">
                    <p>For personalized survey packages, </p>
                    <a href="/contact">Contact Us</a>
                </div>
            </div>
            <div className="survey__packages">
                <div className="package">
                    <img src={bronze} alt="Pilot250" />
                    <h4>Pilot 250</h4>
                    <ul className="package__description">
                        <li>250 Respondents</li>
                        <li>Up to 20 questions</li>
                        <li>25 minutes or less</li>
                    </ul>
                    <div className="package__pricing"><sup>$</sup>750<span>/survey</span> </div>
                    <Link to="/survey/create/pilot250">Create Survey</Link>
                </div>
                <div className="package">
                    <img src={silver} alt="500R" />
                    <h4>500R</h4>
                    <ul className="package__description">
                        <li>500 Respondents</li>
                        <li>Up to 20 questions</li>
                        <li>25 minutes or less</li>
                    </ul>
                    <div className="package__pricing"><sup>$</sup>1350<span>/survey</span> </div>
                    <Link to="/survey/create/500r">Create Survey</Link>
                </div>
                <div className="package">
                    <img src={gold} alt="1000R" />
                    <h4>1000R</h4>
                    <ul className="package__description">
                        <li>1000 Respondents</li>
                        <li>Up to 20 questions</li>
                        <li>25 minutes or less</li>
                    </ul>
                    <div className="package__pricing"><sup>$</sup>2500<span>/survey</span> </div>
                    <Link to="/survey/create/1000r">Create Survey</Link>
                </div>
                <div className="package">
                    <img src={gold} alt="1500R" />
                    <h4>1500R</h4>
                    <ul className="package__description">
                        <li>1500 Respondents</li>
                        <li>Up to 20 questions</li>
                        <li>25 minutes or less</li>
                    </ul>
                    <div className="package__pricing"><sup>$</sup>3000<span>/survey</span> </div>
                    <Link to="/survey/create/1000r">Create Survey</Link>
                </div>
            </div>
        </section>
    )
}

export default Packages;