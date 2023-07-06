import "./surveyresponse.css";
import loader from "../../../assets/loader_2.gif";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const SurveyResponse = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const publicId = cookies.get("public_id");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [surveyStarted, setSurveyStarted] = useState(false);
    const [timer, setTimer] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [submitError, setSubmitError] = useState("");
    const timerRef = useRef(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const [surveyData, setSurveyData] = useState({
        link: "",
        publicId: "",
        questions: "",
        time: "",
        title: "",
        active: "",
        noRespondents: "",
        responses: ""
    });

    // Load survey data
    useEffect(() => {
        const axiosConfig = {
            method: "get",
            url: `https://afrimentary.onrender.com/API/survey/${id}`,
        }
        axios(axiosConfig).then(
            response => {
                const data = response.data.data;
                if (!data.active || data.responses >= data.noRespondents){
                    setErrorMsg("This survey is not accepting responses!");
                } 
                else if (!data.accessible){
                    setErrorMsg("This survey is not accessible!");
                } 
                else {
                    setSurveyData(data);
                    setLoaded(true);
                }
            }
        ).catch(
            error => {
                setErrorMsg(error.response.data.message);
            }
        )

    }, []);

    const handleChange = (e) => {
        setUploadedImage(e.target.files[0]);
        setSubmitError("");
    }
    
    // Start Survey
    const startSurvey = () => {
        setSurveyStarted(true);
        // time survey
        timerRef.current = setInterval(() => {setTimer(prev => {return prev+1 })}, 1000);
    }

    
    // Upload survey Screen shot 
    const handleUpload = (e) => {
        e.preventDefault();
        // stop timer
        clearInterval(timerRef.current);
        if (uploadedImage) {
            // Upload code
            const data = {
                timeTaken: Math.round(timer/60),
                surveyId: id
            }
            let formData = new FormData();
            formData.append('file', uploadedImage);
            formData.append("responseInfo", JSON.stringify(data));
            const axiosConfig = {
                method: "post",
                url: `https://afrimentary.onrender.com/API/survey/respond`,
                maxBodyLength: Infinity,
                data: formData,
                headers: {
                    'Authorization': 'Basic Auth',
                    'x-access-token': token,
                    "Content-Type": "multipart/form-data" 
                }
            }
            axios(axiosConfig).then(
                response => {
                    setUploadedImage(null);
                    navigate(`/respondent/${publicId}`);
                }
            ).catch(
                error => {
                    const err = error?.response?.data?.message;
                    setSubmitError(err);
                }
            )
        } else {
            setSubmitError("No file has been uploaded");
        }
    }


    return (
        <section className="survey__response">
            {loaded ?
            <div className="survey__response-inner">
                <div className="survey__response-sidebar">
                    <header className="sidebar__header">
                        <h2>Afrimentary</h2>
                    </header>
                    <div className="survey__information sidebar__sections">
                        <h3>{surveyData.title} </h3>
                        <p>Estimated survey time: <span>{surveyData.time} minutes</span></p>
                        <p className="note">
                            When done filling out the survey, take a screenshot of the last page and upload it below.
                        </p>
                    </div>
                    {
                        surveyStarted && <div className="response__container sidebar__sections">
                            {submitError && <div className="submit__error survey__error">{submitError}</div>}
                            <form className="response__form" onSubmit={handleUpload} encType="multipart/form-data">
                                <label htmlFor="screenshot">Upload Screenshot</label>
                                <input className="file__input" onChange={handleChange} required id="screenshot" name="screenshot" type="file"  accept=".jpeg, .png, .jpg" />
                                <button type="submit">Upload</button>
                            </form>
                        </div>
                    }
                    {
                        !surveyStarted &&  <div className="survey__timer sidebar__sections">
                            <button onClick={startSurvey} className="start__survey">Start Survey</button>
                        </div>
                    }
                </div>
                <div className="survey__response-main">
                    {surveyStarted && <iframe src="https://stanforduniversity.qualtrics.com/jfe/form/SV_0D1J7Xiddy3uRj8" frameBorder="0"></iframe>}
                </div>
            </div> 
            : errorMsg ? 
            <div className="survey__error">{errorMsg}</div>
            : <div className="survey__loader"><img src={loader} alt="loader"/></div>
            }
        </section>
    )
}

export default SurveyResponse;
