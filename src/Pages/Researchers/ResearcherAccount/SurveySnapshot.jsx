import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import {useContext, useEffect, useState} from "react";
import { ResearcherContext } from "../../../Context/ResearcherAccountContext";
import axios from "axios";


ChartJS.register(ArcElement, Tooltip, Legend);
const SurveySnapshot = () => {
    const {snapShot} = useContext(ResearcherContext);
    const [loadSurvey, setLoadSurvey] = useState(false);
    const [surveyInfo, setSurveyInfo] = useState({
        publicId: "",
        title: "",
        link: "",
        time: "",
        questions: "",
        active: "",
        accessible: "",
        noRespondents: "",
        responses: ""
    });
    useEffect(() => {
        const axiosConfig = {
            method: "get",
            url: `https://afrimentary.onrender.com/API/survey/${snapShot}`
        };
    
        axios(axiosConfig).then(
            response => {
                const data = response?.data?.data;
                setSurveyInfo(data);
                setLoadSurvey(true);
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    }, [snapShot]);
    
    return (
       
        <> {loadSurvey ? <>
            <h4>{surveyInfo.title}</h4>
            <div className="responses__viz">
                <Doughnut data={{labels: ["Responses", "Remaining"],
                    datasets : [{
                        data: [surveyInfo.responses, surveyInfo.noRespondents-surveyInfo.responses],
                        backgroundColor: ["#fd7e50", "#71357c"]
                    }]
                }} />
            </div>
            <div className="survey__summary">
                <h6>Survey Summary</h6>
                <p>Due Date: <span>{surveyInfo.dueDate}</span></p>
                <p>Respondents: <span>{surveyInfo.noRespondents}</span></p>
                <p>Package: <span>{surveyInfo.package}</span></p>
                <p>IRB Number: <span>{surveyInfo.irbNumber}</span></p>
            </div>
            </> : <p>Loading...</p>
        }
        </>
    )
}

export default SurveySnapshot;