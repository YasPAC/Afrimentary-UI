import "./surveyresponse.css";
import { useState, useRef } from "react";
import {Header} from "../../Components";

const SurveyResponse = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [surveyStarted, setSurveyStarted] = useState(false);

    const handleChange = (e) => {
        const image = e.target.files[0];
        setUploadedImage(image);
    }
    
    // Start Timer when survey is started
    const startSurvey = () => {
        setSurveyStarted(true);
    }
    
    return (
        <section className="survey__response">
            <div className="survey__response-inner">
                <div className="survey__response-sidebar">
                    <header className="sidebar__header">
                        <h2>Afrimentary</h2>
                    </header>
                    <div className="survey__info sidebar__sections">
                        <h3>This is the survey title </h3>
                        <p>Estimated survey time: <span>1 minute</span></p>
                        <p className="note">
                            When done filling out the survey, take a screenshot of the last survey page and upload below.
                        </p>
                    </div>
                    {
                        surveyStarted && <div className="response__container sidebar__sections">
                            <form className="response__form">
                            <label htmlFor="screenshot">Upload Screenshot</label>
                            <input onChange={handleChange} required id="screenshot" name="screenshot" type="file"  accept="image/jpeg, image/png, image/jpg" />
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
                    {surveyStarted && <iframe src="https://stanforduniversity.qualtrics.com/jfe/form/SV_0D1J7Xiddy3uRj8" frameborder="0"></iframe>}
                </div>
            </div>
        </section>
    )
}

export default SurveyResponse;
