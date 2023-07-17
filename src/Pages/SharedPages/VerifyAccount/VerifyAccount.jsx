import "./verifyaccount.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const VerifyAccount = () => {
    const [verifySuccess, setVerifySucccess] = useState(false);
    const [verifyFail, setVerifyFail] = useState("");
    const [invalidUrl, setInvalidUrl] = useState(false);
    const {usertype, token} = useParams();

    useEffect(() => {
        const userTypes = ["researcher", "respondent"];
        !userTypes.includes(usertype.toLowerCase())  &&  setInvalidUrl(true);
    }, []);

    const handleVerify = (e) => {
        const requestConfig = {
                method: "put",
                url: usertype.toLowerCase() === "respondent" ? `https://afrimentary.onrender.com/API/respondent/verify`: `https://afrimentary.onrender.com/API/researcher/verify`,
                data: {token: token},
        }
        
            axios(requestConfig).then(
                response => {
                    const message = response.data.message;
                    setVerifySucccess(true);
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }
            ).catch(error => {
                const errorMessage = error.response.data.message;
                setVerifyFail(errorMessage)
            });
    } 
    return (
        <section className="verify__account">
            <div className="verify__container">
                {!invalidUrl ? 
                <>
                {verifySuccess && <div className="verify__message">Success! Account Verified</div>}
                {verifyFail && <div className="verify__message verify__message-fail">{verifyFail}</div>}
                <p>Thank you for creating an account with Afrimentary.</p>
                <p>Verify your account to start enjoying our services.</p>
                <button onClick={handleVerify}>Verify</button>
                </>: 
                <p>Invalid URL!</p>
                }
            </div>
        </section>
    )
}

export default VerifyAccount;