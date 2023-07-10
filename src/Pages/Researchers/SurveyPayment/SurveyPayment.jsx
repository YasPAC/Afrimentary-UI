import "./surveypayment.css";
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Cookies from "universal-cookie";
import axios from "axios";


const CheckoutForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
      <form className="payment__form" onSubmit={handleSubmit}>
        <div className="payment__header">
            <h3>Make payment</h3>
            <p>All our payments are processed by <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">Stripe</a></p>
            <p>Afrimentary does not store any payment related information like card numbers.</p>
        </div>
        <PaymentElement className="form__fields" />
        <button>Pay</button>
      </form>
    );
  }

const SurveyPayment = () => {
    // Accept payment from Researcher for surveys created.
const stripePromise = loadStripe('pk_test_51NRKk3L1Uo2xvTSmi2d56EyjA5gCCmXEaOEs53iRvqe2qTBaVQaCMQGRWSamanQTYCAve3shRzjATujNc6ybKOiU00cGWMRlfJ');

const getClientSecret = () => {
    const axiosConfig = {
        method: "get",
        url: `http://127.0.0.1:5000/payment/intent`,
        headers: {
            'Authorization': 'Basic Auth',
            'x-access-token': token
        }
    }

}
    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'pi_3NSG9aL1Uo2xvTSm1N9bTA86_secret_HijKoSKsHNGdVGUloGcHYgNsF',
      };
    return (
        <section className="survey__payment">
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </section>
    )
}

export default SurveyPayment;