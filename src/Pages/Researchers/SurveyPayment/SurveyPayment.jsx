import "./surveypayment.css";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Cookies from "universal-cookie";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, Context, useContext} from "react";
import CheckoutForm from "./CheckoutForm";
import {ConfirmPayment} from "../../../Components";
import { SurveyPaymentContext } from "../../../Context/SurveyPaymentContext";


const SurveyPayment = () => {
    const cookies = new Cookies();
    const {packages, survey_id} = useParams();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(true);
    const {confirmPayment} = useContext(SurveyPaymentContext);
    const token = cookies.get("token");
    const publicId = cookies.get("public_id");
    const navigation = useNavigate();
    // Accept payment from Researcher for surveys created.
    const stripePromise = loadStripe("pk_test_51NRKk3L1Uo2xvTSmi2d56EyjA5gCCmXEaOEs53iRvqe2qTBaVQaCMQGRWSamanQTYCAve3shRzjATujNc6ybKOiU00cGWMRlfJ")
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
                setClientSecret(response.data.client_secret);
                setLoading(false);
            }
        ).catch(error => {
            console.log(error?.response?.data?.message);
            setLoading(false);
            navigation(`/researcher/${publicId}`);
        });
    }

    useEffect(() => {
        getClientSecret();
    }, []);


    return (
        <section className="survey__payment">
        {!loading ?
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm packages={packages} surveyID={survey_id} />
                {confirmPayment && <ConfirmPayment clientSecret={clientSecret} token={token} surveyID={survey_id} />}
            </Elements>
        : <p>Loading...</p>
        }
        </section>
    )
}

export default SurveyPayment;