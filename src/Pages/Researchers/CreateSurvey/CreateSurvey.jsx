import "./createsurvey.css";
import { useParams } from "react-router-dom";
import {Header, SignupFields, GeneralSelectField} from "../../../Components";
import useMultipleStepForm from "../../../Hooks/useMutliStepForm";
import { useState } from "react";
import {RiArrowRightFill, RiArrowRightCircleFill, RiArrowLeftCircleFill} from "react-icons/ri";
import uniqid from "uniqid";
import survey from "../../../assets/survey.jpg";

const CreateSurvey = () => {
    const {packages} = useParams();
    const [surveyInfo, setSurveyInfo] = useState(
        {
            title: "", numberQuestions: "", field: "", surveyRegion: "", genderRatio: "",
            endDate: "", surveyLink: "", department: "", responseTime: "", ageBracket: "",
            noRespondents: "", IRBNumber: "", package: packages,
        }
    );
    const [progress, setProgress] = useState(0);

    const formProgress = () => {
        setProgress(
            prevProgress => {
                return progress < 100 ? prevProgress + 33: prevProgress;
            });
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setSurveyInfo(prev => {
            return {...prev, [name]: value}
        });
    }

    // Submit form
    const handleRespondentSubmit = (e) => {
        e.preventDefault();
        if(!isLast) {
            next();
            formProgress();
        }
    }

    // Select boxes data
    const ageBracketData = {
        options: [
            {label: "21-25", value: 25}, 
            {label: "26-30", value: 30}, 
            {label: "31-35", value: 35},
            {label: "36-40", value: 40},
            {label: "41-45", value: 45},
            {label: "46-50", value: 50},
            {label: "Over 50", value: 51},
        ],
        fields: {label: "Age Group", name: "ageBracket"}
    };
    const genderRatioData = {
        options: [
            {label: "50-50", value: 50},
            {label: "Random", value: "random"},
        ],
        fields: {label: "Gender Ratio", name: "genderRatio"}
    }
    const regionData = {
        options: [
            {label: "Nairobi Region", value: "Nairobi"},
            {label: "Coastal Kenya", value: "Coast"},
            {label: "Western Kenya", value: "Western"},
            {label: "Eastern/Central Kenya", value: "Eastern"},
            {label: "All Regions", value: "All"}
        ],
        fields: {label: "Region of Interest", name: "surveyRegion"}
    }

    // form steps
    const {next, back, step, isFirst, isLast} = useMultipleStepForm(
        [
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Survey Title", name: "title", type: "text"}} />
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Survey Link", name: "surveyLink", type: "text"}} />
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Field of Study", name: "field", type: "text"}} />
            </div>,
            <div className="field__collection" key={uniqid}>
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "IRB Number", name: "IRBNumber", type: "text"}} />
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Academic Department", name: "department", type: "text"}} />
                <SignupFields handleChange={handleChange} data={surveyInfo} fields={{label: "Number of Question", name: "numberQuestions", type: "number"}} />
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
                <GeneralSelectField handleChange={handleChange} fields={regionData .fields} options={regionData .options} 
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
                        <p>We will help you reach your target audience.</p>
                    </div>
                    <div className="survey__arrow"><RiArrowRightFill size="32px" /></div>
                </div>
                <div className="surveyform__container">
                    <h2>Create Survey</h2>
                    <form className="survey__form" onSubmit={handleRespondentSubmit}>
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