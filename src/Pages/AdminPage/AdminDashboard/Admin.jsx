import "./admin.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import uniqid from "uniqid";

const truncateText = (text, limit) => {
    if (text.length > limit) {
        return `${text.substring(0, limit)} ...`
    } else {
        return text
    }
};

const Admin = () => {
    const cookies = new Cookies();
    const [summaryData, setSummaryData] = useState({
        nSurveys : "",
        nRespondents : "",
        nResearchers : "",
        recentRespondents : "",
        recentResearchers : "",
        recentSurveys : "",
    });
    const token = cookies.get("token");
    const [pageLoaded, setPageLoaded] = useState(false);
    // Request configuration function
    const actionsRequestConfig = (url, method) => {
        const axiosConfig = {
            method: method,
            url: url,
            headers: {
            'Authorization': 'Basic Auth',
            'x-access-token': token
            }
        }
        return axiosConfig;
    }
    useEffect(() => {
        const url = `https://afrimentary.onrender.com/API/admin_summary`;
        const method = "get";
        const requestConfig = actionsRequestConfig(url, method);
        axios(requestConfig).then(res => {
            setSummaryData(res?.data?.data);
            setPageLoaded(true);
        }).catch(
          err => {
            // 
          }
        );

    }, []);
    
    return (
        <section className="admin__dashboard">
        {pageLoaded ? 
            <div className="admin__snapshots">
                <div className="admin__summary">
                    <div className="summary__numbers researchers__total">
                        <h5>Researchers</h5>
                        <p>{summaryData.nResearchers}</p>
                    </div>
                    <div className="summary__numbers respondents__total">
                        <h5>Respondents</h5>
                        <p>{summaryData.nRespondents}</p>
                    </div>
                    <div className="summary__numbers surveys__summary">
                        <h5>Surveys</h5>
                        <p>{summaryData.nSurveys}</p>
                    </div>
                </div>
                <div className="recents recent__surveys">
                    <h3>Recent Surveys</h3>
                    <div className="recents__container recent__surveys-container">
                        {summaryData.recentSurveys.map(survey => (
                        <div key={uniqid()} className="recents__snapshot">
                            <p className="snapshot__title">{truncateText(survey.title, 25)}</p>
                            <p>Package: {survey.package}</p>
                            <p>Responses: {survey.responses}</p>
                        </div>
                        ))}
                    </div>
                </div>
                <div className=" recents recent__researchers">
                    <h3>Recent Researchers</h3>
                    <div className="recents__container recent__researchers-container">
                        {summaryData.recentResearchers.map(researcher => (
                        <div key={uniqid()} className="recents__snapshot">
                            <p className="snapshot__title">{truncateText(researcher.name, 20)}</p>
                            <p>{researcher.institution}</p>
                            <p>{researcher.country}</p>
                        </div>
                        ))}
                        
                    </div>
                </div>
                <div className="recents recent__respondents">
                    <h3>Recent Respondents</h3>
                    <div className="recents__container recent__respondents-container">
                        {
                            summaryData.recentRespondents.map(respondent => (
                                <div key={uniqid()} className="recents__snapshot">
                                    <p className="snapshot__title">{truncateText(respondent.name, 20)}</p>
                                    <p>{respondent.country}</p>
                                    <p>{respondent.gender}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>: <p>Page loading...</p>
            }
            <div className="admin__profile">
                <div className="profile">
                    <h4>Regan Muthomi</h4>
                    <p>Regansomi@gmail.com</p>
                    <p>Admin</p>
                </div>
            </div>
        </section>
    )
}

export default Admin;