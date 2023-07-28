import "./createsurvey.css";
import { useParams, useNavigate } from "react-router-dom";
import {Header, SignupFields, GeneralSelectField} from "../../../Components";
import useMultipleStepForm from "../../../Hooks/useMutliStepForm";
import { useState, useEffect } from "react";
import {RiArrowRightFill, RiArrowRightCircleFill, RiArrowLeftCircleFill} from "react-icons/ri";
import uniqid from "uniqid";
import Cookies from "universal-cookie";
import axios from "axios";
import survey from "../../../assets/survey.jpg";
import loading from "../../../assets/loading.gif";


const CreateSurvey = () => {
    const cookies = new Cookies();
    const {packages} = useParams();
    const [progress, setProgress] = useState(0);
    const token = cookies.get("token");
    const role = cookies.get("role");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [surveyInfo, setSurveyInfo] = useState(
        {
            title: "", numberQuestions: "", field: "",
            endDate: "", surveyLink: "", department: "", responseTime: "",
            noRespondents: "", IRBNumber: "", package: packages, researcherId: ""
        }
    );

    // Progress Bar Increment
    const formProgress = () => {
        setProgress(
            prevProgress => {
                return progress < 100 ? prevProgress + 33: prevProgress;
            });
    };
    // Handle Input changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setSurveyInfo(prev => {
            return {...prev, [name]: value}
        });
        setErrorMsg("");
    }

    // Submit form
    const handleRespondentSubmit = (e) => {
        e.preventDefault();
        if(isLast) {
            setIsLoading(true);
            const axiosConfig = {
                method: "post",
                url: `https://afrimentary.onrender.com/API/survey/create`,
                data: surveyInfo,
                headers: {
                    'Authorization': 'Basic Auth',
                    'x-access-token': token
                }
            }
            axios(axiosConfig).then(
                response => {
                    const responseMsg = response?.data?.message;
                    const surveyID = response?.data?.survey_id;
                    setIsLoading(false);
                    setSuccessMsg(responseMsg);
                    setTimeout(()=> {
                        setSuccessMsg("");
                        role.toLowerCase() == "admin" ? navigate(`/admin/surveys`) : navigate(`/survey/payment/${packages}/${surveyID}`);
                    }, 3000);
                }
            ).catch(
                error => {
                    setIsLoading(false);
                    if (error?.response?.status === 409) {
                        const errorMessage = error?.response?.data?.message;
                        setErrorMsg(errorMessage);
                    } else {
                        setErrorMsg("Error occurred. Please try again!");
                    }
                }
            )
        } else if (!isLast) {
            next();
            formProgress();
        }
    }

    // Select boxes data
    const ageBracketData = {
        options: [
            {label: "Randomized", value: "random"},
        ],
        fields: {label: "Age Group", name: "ageBracket"}
    };
    const genderRatioData = {
        options: [
            {label: "Randomized", value: "random"},
        ],
        fields: {label: "Gender Ratio", name: "genderRatio"}
    }

    // form steps
    const {next, back, step, isFirst, isLast} = useMultipleStepForm(
        [
            <div className="field__collection" key={uniqid}>
                {role.toLowerCase() === "admin" && surveyInfo.package.toLowerCase() === "custom" && 
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Researcher ID", name: "researcherId", type: "number"}} />}
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Survey Title", name: "title", type: "text"}} />
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Survey Link", name: "surveyLink", type: "text"}} />
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Field of Study", name: "field", type: "text"}} />
            </div>,
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "IRB Number", name: "IRBNumber", type: "text"}} />
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Academic Department", name: "department", type: "text"}} />
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Number of Questions", name: "numberQuestions", type: "number"}} />
            </div>,
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Number of Respondents", name: "noRespondents", type: "number"}} />
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Estimated Response Time (in minutes)", name: "responseTime", type: "number"}} />
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "End Date", name: "endDate", type: "date"}} />
            </div>,
            <div className="field__collection" key={uniqid}>
                <GeneralSelectField handleChange={handleChange} fields={ageBracketData.fields} options={ageBracketData.options} 
                    data={surveyInfo}
                />
                <GeneralSelectField handleChange={handleChange} fields={genderRatioData.fields} options={genderRatioData.options} 
                    data={surveyInfo}
                />
            </div>
        ]
    );
     // Previous step
     const goBack = () => {
        back();
        // subtract progress
        setProgress(prevProgress => prevProgress - 33);
     }

    return (
        <section className="create__survey-container">
            <Header />
            <div className="create__survey">
                <div className="create__survey-intro">
                    <img src={survey} alt="createsurvey" />
                    <div>
                        <h3>Create your survey today.</h3>
                    </div>
                    <div className="survey__arrow"><RiArrowRightFill size="32px" /></div>
                </div>
                <div className="surveyform__container">
                    <h2>Create Survey</h2>
                    <form className="survey__form" onSubmit={handleRespondentSubmit}>
                        {errorMsg && <div className="create__responses error">{errorMsg}</div>}
                        {successMsg && <div className="create__responses success">{successMsg}</div>}
                        {isLoading && <img className="loadingSubmit" src={loading} alt="loading"/>}
                        <div className="form__progress">
                            <div style={{"left": `${progress}%`}} className="progress__btn"></div>
                        </div>
                        <div className="fields__section">
                            {step}
                        </div>
                        <div className="survey__buttons">
                            {!isFirst && <button type="button" className="survey__control survey__control-prev" onClick={goBack}><><RiArrowLeftCircleFill /> Previous</></button>}
                            <button type="submit" className={!isLast ? "survey__control survey__control-next": "survey__control survey__control-next submit__survey"}>{!isLast ? <>Next <RiArrowRightCircleFill /></>: "Create Survey"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreateSurvey;