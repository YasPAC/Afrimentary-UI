import "./respondentAccount.css";
import { Header, Footer } from "../../Components";
import Sidebar from "./Sidebar";
import {MdVerified, MdCancel} from "react-icons/md";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useState } from "react";

const RespondentAccount = () => {
    const cookies = new Cookies();
    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoaded, setLoaded] = useState(false);
    const token = cookies.get("token");
    const role = cookies.get("role");
    const [respondentData, setRespondentData] = useState({
        age: "", city: "", country: "", county: "", education_level: "", email: "", first_name: "",
        gender: "", language: "", last_name: "", phone: "", public_id: "", role: "", verified: ""
    });
    const [referred, setReferred] = useState(0);
    
    // Get users referred by this user if associate
    const getReferred = () => {
        const axiosReferrerConfig = {
            method: "get",
            url: `https://afrimentary.onrender.com/API/respondents/${id}/references`,
            headers: {
                'Authorization': 'Basic Auth',
                'x-access-token': token
            }
        }
        axios(axiosReferrerConfig).then(
            response => {
                setReferred(response?.data?.n_verified);
            }
        ).catch(err => {
            // The error rediricts will happen inside useEffect
        });
    }

    useEffect (() => {
        // Load user Data
        const axiosConfig = {
            method: "get",
            url: `https://afrimentary.onrender.com/API/respondents/${id}`,
            headers: {
                'Authorization': 'Basic Auth',
                'x-access-token': token
            }
        }
        axios(axiosConfig).then(response => {
            role != "user" ? getReferred() : null;
            const userData = response.data.respondent;
            setRespondentData(userData);
            setLoaded(true);
        }).catch(err => {
            if (err?.response?.data.message === "User not authorized to perform this task") {
                navigate("/unauthorized");
            }
            else if (err?.response?.data.message === `Respondent with id ${id} doesn't exist`) {
                navigate("*");
            } else {
                navigate("/");
            }
        });

    }, []);

    return (
        <main className="respondent__dash">
            <Header />
            {isLoaded ? 
            <div className="respondent__dash-inner">
                <section className="respondent__dash-sidebar">
                    <Sidebar data={respondentData}/>
                </section>
                <section className="respondent__dash-main">
                    <div className="dash__main-top">
                        <p className="respondent__greeting">Hello, <span>{respondentData.first_name}</span></p>
                        <div className="dash__main-controls">
                            {respondentData.role !== "user"? 
                                <p className="role">Role: <span>{respondentData.role}</span></p>:
                                null
                            }
                            {
                                respondentData.verified ? <p>Verified <MdVerified color="green" size="16px"/></p> :
                                <p>Unverified <MdCancel color="red" size="16px"/></p> 
                            }
                        </div>
                    </div>
                    <div className="respondent__dash-stats">
                        <div className="respondent__stats">
                            <div className="respondent__card">
                                <h4>Surveys completed</h4>
                                <p className="respondent__survey-counts">
                                    0
                                </p>
                            </div>
                            {
                                respondentData.role !== "user" ? 
                                <div className="respondent__card">
                                    <h4>Users Referred</h4>
                                    <small>Verified</small>
                                    <p className="referral__count">
                                        {referred}
                                    </p>
                                </div>: null 
                            }
                        </div>
                        <div className="active__surveys">
                            <div>
                                <h4>Active Surveys</h4>
                                <p>You've been selected for these surveys</p>
                            </div>
                            <div className="active__surveys-list">
                                {/* <Link to="/">Survey 1</Link>
                                <Link to="/">Survey 2</Link>
                                <Link to="/">Survey 3</Link> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div> :
            <p>Loading...</p>}
        </main>
    )
}

export default RespondentAccount;