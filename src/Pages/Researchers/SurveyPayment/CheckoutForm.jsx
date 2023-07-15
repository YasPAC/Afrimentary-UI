import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useState, useContext} from "react";
import { SurveyPaymentContext } from "../../../Context/SurveyPaymentContext";

const CheckoutForm = ({packages, surveyID}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const {setConfirmPayment} = useContext(SurveyPaymentContext);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const {error} = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
              return_url: `https://afrimentary.onrender.com/confirm_payment/${packages}/${surveyID}`,
            },
            redirect: "if_required"
        });
        if (error) {
            setErrorMessage(error.message);
        } else {
          setConfirmPayment(true);
        }
        
    }
    return (
      <form className="payment__form" onSubmit={handleSubmit}>
        {errorMessage && <div className="error_message">{errorMessage}</div>}
        <div className="payment__header">
            <h3>Make payment</h3>
            <p>All our payments are processed by <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">Stripe</a></p>
            <p>Afrimentary does not store any payment related information like card numbers.</p>
        </div>
        <PaymentElement className="form__fields" />
        <button disabled={!stripe}>Pay</button>
      </form>
    );
}
export default CheckoutForm