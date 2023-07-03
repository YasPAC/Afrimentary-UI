import { Link } from "react-router-dom";
const Packages = () => {
    return (
        <div className="survey__packages">
            <div className="package">
                <h4>Bronze Package</h4>
                <ul className="package__description">
                    <li>1000 Respondents</li>
                    <li>15 max questions</li>
                </ul>
                <div className="package__pricing">$ 1000 <span>per survey</span> </div>
                <Link to="/survey/create/bronze">Create Survey</Link>
            </div>
            <div className="package">
                <h4>Silver Package</h4>
                <ul className="package__description">
                    <li>1500 Respondents</li>
                    <li>20 max questions</li>
                </ul>
                <div className="package__pricing">$ 1500 <span>per survey</span> </div>
                <Link to="/survey/create/silver">Create Survey</Link>
            </div>
            <div className="package">
                <h4>Gold Package</h4>
                <ul className="package__description">
                    <li>2000 Respondents</li>
                    <li>25 max questions</li>
                </ul>
                <div className="package__pricing">$ 2000 <span>per survey</span> </div>
                <Link to="/survey/create/gold">Create Survey</Link>
            </div>
            <div className="package">
                <h4>Custom Package</h4>
                <p>Reach out to our team for custom packages.</p>
                <a href="#">Contact Us</a>
            </div>
        </div>
    )
}

export default Packages;