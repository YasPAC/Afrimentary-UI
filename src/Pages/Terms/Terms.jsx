import "./terms.css";
import AssociatesTerms from "./AssociatesTerms";
import RespondentsTerms from "./RespondentsTerms";

const Terms = () => {
    return (
        <main className="afrimentary__terms">
        <div className="terms_wrapper">
            <section className="terms__groups">
                <h3>Terms and Conditions</h3>
                <div className="respondent_terms group">
                    <div className="group__title">
                        <h4>Terms and Conditions for “Users” and “Respondents”</h4>
                        <p>
                            These Terms and Conditions ("Terms") govern your use of our website and services ("Services") 
                            provided by Afrimentary ("Company"). 
                            By using our Services, you agree to comply with these Terms. Please read them carefully.
                        </p>
                    </div>
                    <RespondentsTerms />

                </div>
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
                <div className="researcher__terms group">

                </div>
            </section>
            </div>
        </main>
    )
}

export default Terms;