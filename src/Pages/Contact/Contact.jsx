import "./contact.css";
import ContactForm from "./ContactForm";
import {Header, Footer} from "../../Components";

const Contact = () => {

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