import "./confirmpayment.css";
import {useState, useEffect, useContext} from "react";
import {useStripe} from '@stripe/react-stripe-js';
import check from "../../assets/check.png";
import unsuccessful from "../../assets/fail.png";
import { SurveyPaymentContext } from "../../Context/SurveyPaymentContext";
import axios from "axios";


const ConfirmPayment = ({clientSecret, token, surveyID}) => {
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const stripe = useStripe();
    const [message, setMessage] = useState(null);
    const {setConfirmPayment} = useContext(SurveyPaymentContext);
    const retry = () => {
      setConfirmPayment(false);
    }
    
    // Update payment for the Survey and send out notifications
    const updatePayment = () => {
      const axiosConfig = {
        method: "post",
        url: `https://afrimentary.onrender.com/API/survey/confirm_payment/${surveyID}`,
        headers: {
            'Authorization': 'Basic Auth',
            'x-access-token': token
        }
      }
      axios(axiosConfig).then(
        response => {
          // response
        }
      );
    }


    useEffect(() => {
        if (!stripe) {
          return;
        }
        // Retrieve the PaymentIntent
        stripe
          .retrievePaymentIntent(clientSecret)
          .then(({paymentIntent}) => {
            switch (paymentIntent.status) {
              case 'succeeded':
                setMessage('Success! Payment received.');
                setSuccess(true);
                updatePayment();
                break;
    
              case 'processing':
                setMessage("Payment processing. We'll update you when payment is received.");
                setSuccess(true);
                updatePayment();
                break;
    
              case 'requires_payment_method':
                setMessage('Payment failed. Please try another payment method.');
                setFail(true);
                break;
    
              default:
                setMessage('Something went wrong.');
                setFail(true)
                break;
            }
          });
      }, [stripe]);
    return (
      <section className="confirm__payment">
        <div className="confirm__card">
          {success && <div className="confirm__info success">
            <img src={check} alt="success" />
            <div className="info">
              <h3>Success</h3>
              <p>{message}</p>
            </div>
          </div>}
          {fail && <div className="confirm__info fail">
          <img src={unsuccessful} alt="fail" />
            <div className="info">
              <h3>Fail</h3>
              <p>{message}</p>
            </div>
            <button onClick={retry}>Try Again</button>
          </div>}
        </div>
      </section>   
    )
}

export default ConfirmPayment;