import "./signup.css";
import useMultipleStepForm from "../../Hooks/useMutliStepForm";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupFields from "./SignupFields";
import ReferrerField, {GenderField, EducationField} from "./SelectFields";
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from "react-icons/bs"
import uniqid from "uniqid";
import axios from "axios";
import busy from "../../assets/busy.gif";


function Signup() {
    const navigate = useNavigate();
    const [isRespondent, setIsRespondent] = useState(true);
    const [associates, setAssociates] = useState([]);
    const [errMsg, setErrorMsg] = useState("");
    const errRef = useRef();
    const [respondentData, setRespondentData]  = useState(
        {
            l_name: "",
            f_name: "",
            age: "",
            password: "",
            confirmPass: "",
            education: "",
            gender: "",
            phone: "",
            email: "",
            language: "",
            city: "",
            county: "",
            country: "",
            referred_by: ""
        }
    );
    
    //Load Agents
    useEffect(() => {
        const axiosConfig = {
            method: "get",
            url: "https://afrimentary.onrender.com/API/respondents/associates",
        }
        axios(axiosConfig)
        .then(response => {
            const agents = response?.data?.associates;
            setAssociates(agents);
        })
    }, []);

    // Handle form values change
    const handleRespondentChange = (e) => {
        const {name, value} = e.target
        setRespondentData(prev => {
            return {...prev, [name]: value}
        });
    }

    // Reset error
    useEffect(() => {
        setErrorMsg("")
    }, [respondentData]);

    // Handle form submission
    const handleRespondentSubmit = (e) => {
        e.preventDefault();
        if (isLast) {
            if (respondentData.password != respondentData.confirmPass) {
                setErrorMsg("Passwords are not same");
                errRef.current.focus();
            } else if (respondentData.gender === "" || respondentData.referred_by === "" || respondentData.education==="") {
                setErrorMsg("Please fill these fields (Education, Referred By and Gender)");
                errRef.current.focus();
            }
             else {
                // Send Respondent Data to DB
                const axiosConfig = {
                    method: "post",
                    url: "https://afrimentary.onrender.com/API/respondents/signup",
                    data: respondentData
                }
                axios(axiosConfig)
                .then(response => {
                    if (response.data.message === "Respondent created successfully") {
                        navigate("/");
                        setRespondentData(
                            {
                                l_name: "", f_name: "", age: "", password: "", confirmPass: "", education: "",
                                gender: "", phone: "", email: "", language: "", city: "", county: "", country: "", referred_by: ""
                            }
                        );
                    }
                }).catch(err => {
                    const error = err.response.data;
                    setErrorMsg(error);
                    errRef.current.focus();
                });
            }

        } else if (!isLast) {
            next();
        }
    }

    // Multistep Form Hook
    const {next, back, step, isFirst, isLast} = useMultipleStepForm([
        <div className="field__collection" key={uniqid}>
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "First Name",name: "f_name", type: "text"}} />
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Last Name", name: "l_name", type: "text"}} />
        </div>,
        <div className="field__collection" key={uniqid}>
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Age", name: "age" , type: "number"}} />
            <GenderField data={respondentData} handleChange={handleRespondentChange} />
        </div>
        ,
        <div className="field__collection" key={uniqid}>
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Email", name: "email" , type: "email"}} />
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Phone", name: "phone" , type: "text"}} /> 
        </div>
        ,
        <div className="field__collection" key={uniqid}>
            <EducationField data={respondentData} handleChange={handleRespondentChange} />
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Mother Tongue", name: "language" , type: "text"}} />
        </div>
        ,
        <div className="field__collection" key={uniqid}>
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "City", name: "city" , type: "text"}} />
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "County", name: "county" , type: "text"}} />
        </div>
        ,
        <div className="field__collection" key={uniqid}>
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Country", name: "country" , type: "text"}} />
            <ReferrerField agents={associates} data={respondentData} handleChange={handleRespondentChange} />
        </div>
        ,
        <div className="field__collection" key={uniqid}>
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Password", name: "password" , type: "password"}} />
            <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Confirm Password", name: "confirmPass" , type: "password"}} />
        </div>
        
    ]);
    return (
        <main className="afrimentary__signup">
            <div className="signup__inner">
                <div className="signup__intro">
                    <div className="intro__description">
                        <h2>Welcome to <span className="description__greens">Afrimentary</span></h2>
                        <p>Signup, share your opinion, earn.</p>
                    </div>
                </div>
                <div className="signup__container">
                    <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                    <h3>Signup</h3>
                    <p className="signup__register">Already have an account? <Link to="/login">Login</Link></p>
                    <div className="signup__toggle">
                        <div 
                            className = {isRespondent ? `toggle__button toggle__button-respondent active` : `toggle__button toggle__button-respondent`}
                            onClick={() => {setIsRespondent(true)}}
                        >
                            <p>As Respondent</p>
                        </div>
                        <div 
                            className={!isRespondent ? `toggle__button toggle__button-researcher active` : `toggle__button toggle__button-researcher`}
                            onClick={() => {setIsRespondent(false)}}
                            >
                            <p>As Researcher</p>
                        </div>
                    </div>
                    {isRespondent ? 
                    <form className="signup__form" onSubmit={handleRespondentSubmit}>
                        {step}
                        <div className="signup__controls">
                            {!isFirst && <button type="button" className="control control-prev" onClick={back}><><BsFillArrowLeftCircleFill /> Previous</></button>}
                            <button type="submit" className={!isLast? "control control-next": "form__submit"}>{!isLast ? <>Next <BsFillArrowRightCircleFill /></> : "Sign Up"}</button>
                        </div>
                    </form>
                    : 
                    <div className="coming-soon">
                        <h2>We are working on this!</h2>
                        <img className="busy__gif" src={busy} alt="busy-gif" />
                    </div>
                    }
                </div>
            </div>
        </main>
    )
}

export default Signup;