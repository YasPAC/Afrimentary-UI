import "./respondentreset.css";
import { Header, SignupFields} from "../../Components";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import loading from "../../assets/loading.gif";

const RespondentReset = () => {
    const [resetPasswords, setResetPasswords] = useState({password: "", confirmPassword: ""});
    const [errorMsg, setErrorMsg] = useState("");
    const [working, setWorking] = useState(false);
    
    //Handle Change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setResetPasswords(prev => {return {...prev, [name]: value}});
        setErrorMsg("");
    }

    // Submit Form
    const handleSubmit = (e) => {
        setWorking(true);
        e.preventDefault();
        password != confirmPassword && setErrorMsg("Password do not match!")

    }


    return (
        <section className="respondent__reset">
            <Header />
            <div className="respondent__reset-container">
                <h3>Reset Password</h3>
                <form className="respondent__reset-form" onSubmit={handleSubmit}>
                    {errorMsg && <div className="password_reset-error">{errorMsg}</div>}
                    {working && <img className="loadingReset" src={loading} alt="loading"/>}
                    <SignupFields handleChange={handleChange} data={resetPasswords} fields={{label: "New Password", name: "password", type: "password"}} />
                    <SignupFields handleChange={handleChange} data={resetPasswords} fields={{label: "Confirm Password", name: "confirmPassword", type: "password"}} />
                    <div className="respondent__password-reset">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default RespondentReset;