import "./requestpassreset.css";
import axios from "axios";
import { SignupFields, Header } from "../../Components";
import { useState } from "react";
import loading from "../../assets/loading.gif";


const RequestPassReset = () => {
    const [userEmail, setUserEmail] = useState({email: ""});
    const [errorMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [working, setWorking] = useState(false);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserEmail({[name]: value});
        setErrMsg("");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const axiosConfig = {
            method: "post",
            url: "https://afrimentary.onrender.com/API/respondents/request_password",
            data: userEmail
        }
        axios(axiosConfig).then(response => {
            const apiResponse = response?.data?.message;
            setSuccessMsg(apiResponse);
        }).catch(
            err => {
                const error = err?.response?.data?.message;
                err?.response?.status === 505 ? setErrMsg("Server Err") : setErrMsg(error);
            }
        );
    }

    return (
        <section className="requestReset">
            <Header />
            <div className="requestReset__container">
                <h3>Request Password Reset</h3>
                <form className="requestReset__form" onSubmit={handleSubmit}>
                    {working && <img className="loadingMsg" src={loading} alt="loading"/>}
                    {errorMsg && <div className="password_change-msg">{errorMsg}</div>}
                    {successMsg && <div className="password_change-msg success">{successMsg}</div>}
                    <SignupFields handleChange={handleChange} data={userEmail} fields={{label: "Email", name: "email", type: "email"}} />
                    <div>
                        <button>Send</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default RequestPassReset;