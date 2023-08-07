import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useState, useContext} from "react";
import { SurveyPaymentContext } from "../../../Context/SurveyPaymentContext";

const CheckoutForm = ({packages, surveyID}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const {setConfirmPayment} = useContext(SurveyPaymentContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
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
            redirect: "if_required",
        });
        if (error) {
            setErrorMessage(error.message);
            setProcessing(false);
        } else {
          setConfirmPayment(true);
          setProcessing(false);
        }
    }
    errorMessage && setTimeout(() => {setErrorMessage(false)}, 3000);
    return (
      <form className="payment__form" onSubmit={handleSubmit}>
        {errorMessage && <div className="error_message">{errorMessage}</div>}
        <PaymentElement className="form__fields" />
        <button disabled={processing}>Pay</button>
      </form>
    );
}
export default CheckoutForm