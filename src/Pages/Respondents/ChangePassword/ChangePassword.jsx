import "./changepassword.css";
import {Header, SignupFields} from "../../../Components";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import loading from "../../../assets/loading.gif";


const ChangePassword = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const {id} = useParams();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [passwords, setPasswords] = useState({oldPassword: "", newPassword: "", confirmPassword: ""});
    const [working, setWorking] = useState(false);
    
    //Handle Change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setPasswords(prev => {return {...prev, [name]: value}});
        setErrorMsg("");
    }

    // Submit Form
    const handleSubmit = (e) => {
        setWorking(true);
        e.preventDefault();
        if (passwords.newPassword === passwords.confirmPassword) {
            const axiosPassConfig = {
                method: "put",
                url: `https://afrimentary.onrender.com/API/respondent/${id}/changepass`,
                data: passwords,
                headers: {
                    'Authorization': 'Basic Auth',
                    'x-access-token': token
                }
            }
            axios(axiosPassConfig).then(
                response => {
                    setPasswords({oldPassword: "", newPassword: "", confirmPassword: ""});
                    navigate(`/respondent/${id}`);
                    setWorking(false);
                }
            ).catch(error => {
                setWorking(false);
                const err = error?.response?.data.message;
                setErrorMsg(err);
            });
        } else {
            setErrorMsg("Passwords don't match!");
        }
    }
    return (
        <article className="respondent__password-change">
            <Header />
            <div className="password__change-container">
                <h3>Change password</h3>
                <form className="respondent__change-form" onSubmit={handleSubmit}>
                    {working && <img className="loadingMsg" src={loading} alt="loading"/>}
                    {errorMsg && <div className="password_change-error">{errorMsg}</div>}
                    <SignupFields handleChange={handleChange} data={passwords} fields={{label: "Old Password", name: "oldPassword", type: "password"}} />
                    <SignupFields handleChange={handleChange} data={passwords} fields={{label: "New Password", name: "newPassword", type: "password"}} />
                    <SignupFields handleChange={handleChange} data={passwords} fields={{label: "Confirm Password", name: "confirmPassword", type: "password"}} />
                    <div className="changeRespondent__password">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </article>
    )
}
export default ChangePassword;