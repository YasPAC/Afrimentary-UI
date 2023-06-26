import "./surveyresponse.css";
import { useState, useRef } from "react";
import {Header} from "../../Components";

const SurveyResponse = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [surveyStarted, setSurveyStarted] = useState(false);
    const [time, setTime] = useState({ minutes: 1, seconds: 0 });
    const timerRef = useRef(null);

    const handleChange = (e) => {
        const image = e.target.files[0];
        setUploadedImage(image);
    }
    
    const surveyCountdown = (mins) => {
        if (timerRef.current === null) {
        timerRef.current = setInterval(() => {
            setTime((prevTime) => {
            if (prevTime.seconds === 0 && prevTime.minutes === 0) {
                // Countdown is complete
                stopTimer();
                return prevTime;
            } else if (prevTime.seconds === 0) {
                // If seconds reach 0, decrement minutes and set seconds to 59
                return {
                minutes: prevTime.minutes - 1,
                seconds: 59,
                };
            } else {
                // Otherwise, decrement seconds
                return {
                minutes: prevTime.minutes,
                seconds: prevTime.seconds - 1,
                };
            }
            });
        }, 1000);
        }
    };
    
    const stopTimer = () => {
        if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        }
    };
    // Start Timer when survey is started
    const startSurvey = () => {
        setSurveyStarted(true);
        surveyCountdown();
    }
    
    return (
        <section className="survey__response">
            <Header />
            <div className="survey__response-inner">
                <div className="survey__response-sidebar">
                    <div className="survey__info sidebar__sections">
                        <h3>This is the survey title </h3>
                        <p>Estimated survey time: <span>1 minute</span></p>
                    </div>
                    <div className="survey__timer sidebar__sections">
                        {
                            surveyStarted ? 
                            <>
                                <h3>Timer</h3>
                                <h4>{time.minutes.toString().padStart(2, '0')}:{time.seconds.toString().padStart(2, '0')}</h4>
                            </> :
                            <button onClick={startSurvey} className="start__survey">Start Survey</button>
                        }
                    </div>
                    <div className="response__container sidebar__sections">
                        <p className="note">
                            When done filling out the survey, take a screenshot of the last survey page and upload below.
                        </p>
                        {surveyStarted && <form className="response__form">
                            <label htmlFor="screenshot">Upload Screenshot</label>
                            <input onChange={handleChange} required id="screenshot" name="screenshot" type="file"  accept="image/jpeg, image/png, image/jpg" />
                            <button type="submit">Upload</button>
                        </form>}
                    </div>
                </div>
                <div className="survey__response-main">
                    {surveyStarted && <iframe src="https://stanforduniversity.qualtrics.com/jfe/form/SV_0D1J7Xiddy3uRj8" frameborder="0"></iframe>}
                </div>
            </div>
        </section>
    )
}

export default SurveyResponse;
