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
                <p>All our packages are paid for per survey. We also offer personalized survey packages.</p>
            </div>
            <div className="survey__packages">
                <div className="package">
                    <img src={bronze} alt="bronze_package" />
                    <h4>Bronze</h4>
                    <ul className="package__description">
                        <li>1000 Respondents</li>
                        <li>15 max questions</li>
                    </ul>
                    <div className="package__pricing"><sup>$</sup>1000<span>/survey</span> </div>
                    <Link to="/survey/create/bronze">Create Survey</Link>
                </div>
                <div className="package">
                    <img src={silver} alt="silver_package" />
                    <h4>Silver</h4>
                    <ul className="package__description">
                        <li>1500 Respondents</li>
                        <li>20 max questions</li>
                    </ul>
                    <div className="package__pricing"><sup>$</sup>1500<span>/survey</span> </div>
                    <Link to="/survey/create/silver">Create Survey</Link>
                </div>
                <div className="package">
                    <img src={gold} alt="gold_package" />
                    <h4>Gold</h4>
                    <ul className="package__description">
                        <li>2000 Respondents</li>
                        <li>25 max questions</li>
                    </ul>
                    <div className="package__pricing"><sup>$</sup>2000<span>/survey</span> </div>
                    <Link to="/survey/create/gold">Create Survey</Link>
                </div>
                <div className="package">
                    <img src={custom} alt="custom_packages" />
                    <h4>Custom</h4>
                    <p>Reach out to our team for custom packages.</p>
                    <a href="#">Contact Us</a>
                </div>
            </div>
        </section>
    )
}

export default Packages;