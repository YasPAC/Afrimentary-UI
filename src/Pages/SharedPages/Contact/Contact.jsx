import "./contact.css";
import ContactForm from "./ContactForm";
import {Header, Footer} from "../../../Components";
import { DocTitle } from "../../../Utilities";

const Contact = () => {
    DocTitle("Contact Afrimentary - Our online platform is dedicated to revolutionizing the connection between researchers and Africa-based respondents")
    return (
    <main className="afrimentary__contact">
        <Header />
        <div className="form__container">
            <h3>Get in Touch</h3>
            <ContactForm />
        </div>
        <div className="contact__footer">
            <Footer />
        </div>
    </main>
    )
}
export default Contact;