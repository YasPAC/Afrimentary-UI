import { Link } from "react-router-dom";
import packageIcon from "../../../assets/gold.png";
import { useContext } from "react";
import  {ResearcherContext} from "../../../Context/ResearcherAccountContext";

const Packages = () => {
    const {researcherData} = useContext(ResearcherContext);
    
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
                {
                   researcherData.packages.map(data => (
                    data.active &&
                    <div className="package" key={data.package}>
                        <img src={packageIcon} alt="" />
                        <h4>{data.package}</h4>
                        <ul className="package__description">
                            <li>{data.respondents} Respondents</li>
                            <li>Up to {data.questions} questions</li>
                            <li>{data.time} minutes or less</li>
                        </ul>
                        <div className="package__pricing"><sup>$</sup>{data.price}<span>/survey</span> </div>
                        <Link to={`/survey/create/${data.package}`}>Create Survey</Link>
                    </div>
                   ))
                }
            </div>
        </section>
    )
}

export default Packages;