import "./signup.css";
import useMultipleStepForm from "../../../Hooks/useMutliStepForm";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {SignupFields} from "../../../Components";
import {GenderField, EducationField, CheckBox, Counties, Countries} from "../../../Components";
import {RiArrowRightCircleFill, RiArrowLeftCircleFill} from "react-icons/ri"
import uniqid from "uniqid";
import axios from "axios";
import loading from "../../../assets/loading.gif";
import dash from "../../../assets/sitting.webp";
import { DocTitle, countries } from "../../../Utilities";


function Signup() {
    DocTitle("Afrimentary Signup - Welcome to Afrimentary");
    const navigate = useNavigate();
    const [isRespondent, setIsRespondent] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const errRef = useRef();
    const successRef = useRef();
    const [respondentData, setRespondentData]  = useState(
        {
            l_name: "",
            f_name: "",
            age: "",
            password: "",
            confirmPass: "",
            education_level: "",
            gender: "",
            phone: "",
            email: "",
            language: "",
            city: "",
            county: "",
            country: "",
        }
    );
    const [researcherData, setResearcherData] = useState({
        l_name: "",
        f_name: "",
        password: "",
        confirmPass: "",
        phone: "",
        email: "",
        country: "",
        institution: ""
    });

    // Handle respondent form values change
    const handleRespondentChange = (e) => {
        const {name, value} = e.target
        setRespondentData(prev => {
            return {...prev, [name]: value.trimStart()}
        });
        // Set Phone code
        if (name === "country") {
            if (value) {
                const selectedCountry = countries.find(country => country.name === value);
                setRespondentData(prev => {
                    return {...prev, phone: selectedCountry?.phoneCode, county: ""}
                });
            } 
        }

        // Reset Error msg
        errMsg && setErrorMsg("");
    }

    // Handle Researcher Data
    const handleResearcherChange = (e) => {
        const {name, value} = e.target
        setResearcherData(prev => {
            return {...prev, [name]: value.trimStart()}
        });
    }
    // Reset User Data
    const resetUserData = () => {
        isRespondent ? setRespondentData(
            {
                l_name: "", f_name: "", age: "", password: "", confirmPass: "", education_level: "",
                gender: "", phone: "", email: "", language: "", city: "", county: "", country: ""
            }
        ) : setResearcherData(
            {
                l_name: "", f_name: "", password: "", confirmPass: "", phone: "", 
                email: "", country: "", institution: ""
            }
        )
    }

    // SignUp
    const handleSignUp = (data) => {
        if (isLast) {
            if (data?.password != data?.confirmPass) {
                setErrorMsg("Passwords are not same");
                errRef.current.focus();
            }  else if (data?.phone?.length < 11 || data?.phone?.length > 16) {
                setErrorMsg("Invalid phone number");
                errRef.current.focus();
            }
             else {
                // Send Respondent Data to DB
                setIsLoading(true);
                const axiosConfig = {
                    method: "post",
                    url: isRespondent ? "https://afrimentary.onrender.com/API/respondents/signup" : 
                    "https://afrimentary.onrender.com/API/researchers/create",
                    data: data
                }
                axios(axiosConfig)
                .then(response => {
                    if (response.data.message) {
                        setSuccessMsg("Your account has been created. Verification link sent to your email");
                        successRef.current.focus();
                        setTimeout(() => {navigate("/login")}, 5000);
                        setIsLoading(false);
                        resetUserData();
                    }
                }).catch(err => {
                    const error = err.response.data.message;
                    setErrorMsg(error);
                    setIsLoading(false);
                    errRef.current.focus();
                });
            }

        } else if (!isLast) {
            next();
        }
    }

    // Handle form submission
    const handleRespondentSubmit = (e) => {
        e.preventDefault();
        isRespondent ? handleSignUp(respondentData): handleSignUp(researcherData);
    }

    // Multistep Form Hook
    const {next, back, step, isFirst, isLast} = useMultipleStepForm(
        isRespondent ? [
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "First Name",name: "f_name", type: "text"}} />
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Last Name", name: "l_name", type: "text"}} />
            </div>,
            <div className="field__collection" key={uniqid}>
                <Countries data={respondentData} handleChange={handleRespondentChange} />
                <SignupFields handleChange={handleRespondentChange}  data={respondentData} example="e.g +254700000000" fields={{label: "Phone", name: "phone" , type: "text"}} /> 
            </div>,
            <div className="field__collection" key={uniqid}>
                {respondentData.country === "Kenya" ?
                    <Counties data={respondentData} handleChange={handleRespondentChange} />:
                    <SignupFields handleChange={handleRespondentChange}  data={respondentData} fields={{label: "Province/State", name: "county" , type: "text"}} />
                }
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Email", name: "email" , type: "email"}} />
            </div>,
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Age", name: "age" , type: "number"}} />
                <GenderField data={respondentData} handleChange={handleRespondentChange} />
            </div>
            ,
            <div className="field__collection" key={uniqid}>
                <EducationField data={respondentData} handleChange={handleRespondentChange} />
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Native Language", name: "language" , type: "text"}} />
            </div>
            ,
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Password", name: "password" , type: "password"}} />
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Confirm Password", name: "confirmPass" , type: "password"}} />
            </div>,
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "City", name: "city" , type: "text"}} />
                <CheckBox />
            </div>
        ] : 
        [
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "First Name",name: "f_name", type: "text"}} />
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Last Name", name: "l_name", type: "text"}} />
            </div>,
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Email", name: "email" , type: "email"}} />
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Phone", name: "phone" , type: "text"}} /> 
            </div>,
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Institution", name: "institution" , type: "text"}} />
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Country", name: "country" , type: "text"}} /> 
            </div>,
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Password", name: "password" , type: "password"}} />
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Confirm Password", name: "confirmPass" , type: "password"}} />
            </div>,
            <div className="field__collection" key={uniqid}>
                <CheckBox />
            </div>
        ]
    );
    return (
        <main className="afrimentary__signup">
            <div className="signup__inner">
                <div className="signup__intro">
                    <img src={dash} alt="afrimentary"/>
                    <div className="signup__cover"></div>
                    <div className="intro__description">
                        <h2>Welcome to <span className="description__greens">Afrimentary</span></h2>
                    </div>
                </div>
                <div className="signup__container">
                    <p ref={errRef} className={errMsg ? "message error" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                    <p ref={successRef} className={successMsg ? "message success" : "offscreen"} aria-live='assertive'>{successMsg}</p>
                    {isLoading && <img className="loadingMsg" src={loading} alt="logging-in"/>}
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
                    <form className="signup__form" onSubmit={handleRespondentSubmit} key={isRespondent ? "respondent": "researcher"}>
                        {step}
                        <div className="signup__controls">
                            {!isFirst && <button type="button" className="control control-prev" onClick={back}><><RiArrowLeftCircleFill /> Previous</></button>}
                            {
                                <button disabled={isLast && isLoading} type="submit" className={!isLast? "control control-next": "form__submit"}>
                                {!isLast ? <>Next <RiArrowRightCircleFill /></> : isLoading ? "Signing up..." : "Sign Up"}
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Signup;