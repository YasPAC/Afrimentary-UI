import "./surveypayment.css";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Cookies from "universal-cookie";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import CheckoutForm from "./CheckoutForm";
import {ConfirmPayment} from "../../../Components";
import { SurveyPaymentContext } from "../../../Context/SurveyPaymentContext";


const SurveyPayment = () => {
    const cookies = new Cookies();
    const {packages, survey_id} = useParams();
    const [clientSecret, setClientSecret] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(true);
    const {confirmPayment} = useContext(SurveyPaymentContext);
    const token = cookies.get("token");
    const publicId = cookies.get("public_id");
    const navigation = useNavigate();
    // Accept payment from Researcher for surveys created.
    const stripePromise = loadStripe("pk_live_51NTrHwJpbjh94q8FU1m92lrQJgGYlPvPusbn8pSz8zCKafF7UHDaZtlD2EoDoBsriMGQ8d1X2YWSEbTM6WKLflKG00sAfHSZ6w");
    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret
    };

    const requestConfig = (url, method) => {
        const config = {
            method: method,
            url: url,
            data: {package: packages, survey_id: survey_id},
            headers: {
                'Authorization': 'Basic Auth',
                'x-access-token': token
            }
        }
        return config;
    }

    const getClientSecret = () => {
        // Load client secret
        const getClientSecretConfig = requestConfig("https://afrimentary.onrender.com/payment/intent", "post");
        axios(getClientSecretConfig).then(
            response => {
                setClientSecret(response?.data?.response?.client_secret);
                setPrice(response?.data?.response?.price)
                setLoading(false);
            }
        ).catch(error => {
            setLoading(false);
            navigation(`/researcher/${publicId}`);
        });
    }

    useEffect(() => {
        getClientSecret();
    }, []);


    return (
        <section className="survey__payment">
            <div className="survey__payment-inner">
                <div className="payment__header">
                    <h3>Make your payment</h3>
                    <p>All payments made through our platform are securely processed by <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">Stripe</a></p>
                    <p>Afrimentary does not store any payment-related information, such as card numbers, to ensure the utmost security for our customers.</p>
                </div>
            {!loading ?
                <Elements stripe={stripePromise} options={options}>
                    <div className="payment__container">
                        <div className="payment__info">
                            <div className="info__top">
                                <h4>Afrimentary</h4>
                            </div>
                            <div className="package__info">
                                <div className="info__item">
                                    <p>Package {packages}</p>
                                    <h6>${price}</h6>
                                </div>
                                <div className="info__item">
                                    <p>Total</p>
                                    <h6>${price}</h6>
                                </div>
                            </div>
                            <div className="powered_by">
                                <span>Powered by </span>
                                <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">Stripe</a>
                            </div>
                        </div>
                        <CheckoutForm packages={packages} surveyID={survey_id} />
                    </div>
                    {confirmPayment && <ConfirmPayment clientSecret={clientSecret} token={token} surveyID={survey_id} />}
                </Elements>
            : <p>Loading...</p>
            }
            </div>
        </section>
    )
}

export default SurveyPayment;