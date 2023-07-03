import "./passwordreset.css";
import { Header, SignupFields} from "../../../Components";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import loading from "../../../assets/loading.gif";

const PasswordReset = () => {
    const [resetPasswords, setResetPasswords] = useState({password: "", confirmPassword: ""});
    const [errorMsg, setErrorMsg] = useState("");
    const [working, setWorking] = useState(false);
    const {token, usertype} = useParams();
    const navigate = useNavigate();
    
    //Handle Change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setResetPasswords(prev => {return {...prev, [name]: value}});
        setErrorMsg("");
    }

    // Submit Form
    const handleSubmit = (e) => {
        setWorking(true);
        const userTypes = ["researcher", "respondent"];
        e.preventDefault();
        if(resetPasswords.password === resetPasswords.confirmPassword) {
            const axiosPassConfig = {
                method: "put",
                url: `https://afrimentary.onrender.com/API/${usertype}/password_reset/${token}`,
                data: resetPasswords,
            }

            userTypes.includes(usertype) ? axios(axiosPassConfig).then(response => {
                const resetResponse = response?.data?.message;
                setWorking(false);
                navigate("/login");
            }).catch(err => {
                const error = err?.response?.data?.message;
                setWorking(false);
                setErrorMsg(error);
            }) : setErrorMsg("Invalid reset link");

        } else {
            setErrorMsg("Passwords do not match!");
            setWorking(false);
        }

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

export default PasswordReset;