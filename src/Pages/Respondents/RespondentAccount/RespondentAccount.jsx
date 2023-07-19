import "./respondentAccount.css";
import { Header, UpdateForm, Sidebar, Notifications } from "../../../Components";
import {MdVerified, MdCancel, MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {RiCloseLine} from "react-icons/ri";
import {RespondentContext} from "../../../Context/RespondentAccountContext";
import { DocTitle } from "../../../Utilities";

const RespondentAccount = () => {
    DocTitle("Respondent Account - Harness your insights, create knowledge, and get paid ♡");
    const cookies = new Cookies();
    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoaded, setLoaded] = useState(false);
    const role = cookies.get("role");
    const token = cookies.get("token");
    const {respondentData, setRespondentData, setToken,
        openSidebar, setOpenSidebar, updateRespondent, setUpdateRespondent} = useContext(RespondentContext);
    
    
    // request config
    const requestConfig = (url, method) => {
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

    const fetchUserData = () => {
        // Load user Data
        const userDataConfig = requestConfig(`https://afrimentary.onrender.com/API/respondents/${id}`, "get");
        axios(userDataConfig).then(response => {
            const userData = response?.data?.respondent;
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
    }

    useEffect (() => {
        setToken(token);
        fetchUserData();
    }, []);

    const toggleSidebar = () => {
        setOpenSidebar(prev => !prev);
    }

    const toggleUpdate = () => {
        setUpdateRespondent(prev => !prev);
        setOpenSidebar(false);
    }

    return (
        <main className="respondent__dash">
            <Header />
            {isLoaded ? 
            <div className="respondent__dash-inner">
                <section className={!openSidebar ? "respondent__dash-sidebar" : "respondent__dash-sidebar sidebar__unhide"}>
                    <Sidebar data={respondentData} update={toggleUpdate}/>
                </section>
                {openSidebar ? 
                    <div onClick={toggleSidebar}  className="sidebar__controls hide__sidebar-btn">
                        <MdOutlineArrowBackIos size={32} />
                    </div> 
                    :
                    <div onClick={toggleSidebar} className="sidebar__controls show__sidebar-btn">
                        <MdOutlineArrowForwardIos size={32} />
                    </div>
                }
                <section className="respondent__dash-main">
                    {updateRespondent && <UpdateForm token={token} fetchData={fetchUserData}/>}
                    {updateRespondent && <div className="update__close" onClick={toggleUpdate}>
                        <RiCloseLine  color={"green"} size={48}/>
                    </div>}
                    <div className="dash__main-top">
                        <p className="respondent__greeting">Hello, <span>{respondentData.first_name}</span></p>
                        <div className="dash__main-controls">
                            {respondentData.role !== "user" ? 
                                <p className="role">{respondentData.role}</p>:
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
                                    {respondentData.surveys}
                                </p>
                            </div>
                        </div>
                        <div className="message__board">
                            <div className="board__header">
                                <h4>Notifications</h4>
                                <p>Your unread notifications appear here</p>
                            </div>
                            <Notifications />
                        </div>
                    </div>
                </section>
            </div> :
            <p>Loading...</p>}
        </main>
    )
}

export default RespondentAccount;