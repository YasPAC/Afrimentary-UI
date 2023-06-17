import "./terms.css";
import AssociatesTerms from "./AssociatesTerms";

const Terms = () => {
    return (
        <main className="afrimentary__terms">
        <div className="terms_wrapper">
            <section className="terms__groups">
                <h3>Terms and Conditions</h3>
                <div className="associates_terms group">
                <div className="group__title">
                    <h4>Terms and Conditions for Temporary Registration Associates</h4>
                    <p>
                        Please read the following Terms and Conditions carefully before registering as a Temporary Registration Associate. 
                        By registering in this role, you acknowledge and agree to be bound by these terms and conditions:
                    </p>
                </div>
                    <AssociatesTerms />

                </div>
                <div className="respondents_terms group">
                </div>
                <div className="researcher__terms group">

                </div>
            </section>
            </div>
        </main>
    )
}

export default Terms;