import "./researcheraccount.css";
import loader from "../../../assets/loader_2.gif";
import {Header, ResearcherSidebar, ResearcherUpdateForm} from "../../../Components";
import Packages from "./Packages";
import SurveySnapshot from "./SurveySnapshot";
import {useContext, useEffect, useState} from "react";
import {RiCloseLine, RiSurveyFill} from "react-icons/ri";
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";
import axios from "axios";
import Cookies from "universal-cookie";
import { useParams, Link } from "react-router-dom";
import uniqid from "uniqid";
import  {ResearcherContext} from "../../../Context/ResearcherAccountContext";
import { DocTitle } from "../../../Utilities";

const truncateText = (text, limit) => {
    if (text.length > limit) {
        return `${text.substring(0, limit)} ...`
    } else {
        return text
    }
};

const ResearcherAccount = () => {
    DocTitle("Researcher Account - We aim to bridge the gap between researchers and the diverse communities across Africa")
    const cookies = new Cookies();
    const token = cookies.get("token");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const {id} = useParams();
    const {
        isLoaded, setLoaded, updateResearcher, setUpdateResearcher, openSidebar, setOpenSidebar,
        showDashboard, setShowDashboard, researcherData, setResearcherData, snapShot, setSnapshot
    } = useContext(ResearcherContext);

    const fetchData = () => {
        const axiosConfig = {
            method: "get",
            url: `https://afrimentary.onrender.com/API/researchers/${id}`,
            headers: {
                'Authorization': 'Basic Auth',
                'x-access-token': token
            }
        }
        axios(axiosConfig).then(
            response => {
                const data = response?.data?.researcher;
                setLoaded(true);
                setResearcherData(data);
                // Set the latest active survey if any
                data?.activeSurveys.length > 0 && setSnapshot(data?.activeSurveys[0]?.public_id);
            }
        ).catch( err => {
                if (err?.response?.data?.message === "User not authorized to perform this task") {
                    navigate("/unauthorized");
                }
                else if (err?.response?.data?.message === "Researcher not found") {
                    navigate("*");
                } else {
                    navigate("/");
                }
            }
        )
    }

    useEffect(() => {
        fetchData();
    }, [successMessage]);

    //Close the packages and info update form
    const close = () => {
        showDashboard ? setShowDashboard(false): null;
        updateResearcher ? setUpdateResearcher(false): null;
    }
    //Open Sidebar in smaller screens
    const toggleSidebar = () => {
        setOpenSidebar(prev => !prev);
    }

    // Delete survey
    const deleteSurvey = (e) => {
        const id = e.target.id;
        const axiosConfig = {
            method: "delete",
            url: `https://afrimentary.onrender.com/API/survey/delete/${id}`,
            headers: {
                'Authorization': 'Basic Auth',
                'x-access-token': token
            }
        }
        axios(axiosConfig).then(res => {
            setSuccessMessage(res?.data?.message);
        }).catch(err => {
            setErrorMessage(err?.response?.data?.message);
        });
    }
    // Close error message & success message after 5seconds
    errorMessage && setTimeout(() => {setErrorMessage(false)}, 5000);
    successMessage && setTimeout(() => {setSuccessMessage(false)}, 5000);
    return (
        <section className="researcher__account">
            <Header />
            {isLoaded ?
            <div className="researcher__dash">
                <section className={!openSidebar ? "researcher__dash-sidebar" : "researcher__dash-sidebar display__sidebar"}>
                    <ResearcherSidebar data={researcherData} closeAll={close} fetchData={fetchData}/>
                </section>
                {openSidebar ? 
                    <div onClick={toggleSidebar}  className="control__sidebar hide__sidebar-btn">
                        <MdOutlineArrowBackIos size={32} />
                    </div> 
                    :
                    <div onClick={toggleSidebar} className="control__sidebar show__sidebar-btn">
                        <MdOutlineArrowForwardIos size={32} />
                    </div>
                }
                <section className="researcher__main">
                    {errorMessage && <div className="response__messages">{errorMessage}</div>}
                    {successMessage && <div className="response__messages success">{successMessage}</div>}
                    {(showDashboard || updateResearcher) && <div className="update__close" onClick={close} >
                        <RiCloseLine  color={"green"} size={48}/>
                    </div>}
                    {updateResearcher && <ResearcherUpdateForm data={researcherData} token={token} fetchData={fetchData} />}
                    {updateResearcher ? null : showDashboard ? null : <Packages  />}
                    {showDashboard &&
                    <div className="researcher__stats">
                        <div className="survey__groups">
                            <div className="stat__section">
                                <div className="surveys__number">
                                    <p>{researcherData?.activeSurveys?.length}</p>
                                </div>
                                <h3>Active Surveys</h3>
                                <div className="surveys__links">
                                    {researcherData?.activeSurveys?.length > 0 && researcherData.activeSurveys.slice(0,3).map(survey => {
                                        return <div  key={uniqid()} className="surveysLinks__container">
                                            <p  id={survey.public_id} key={uniqid()} onClick={(e) => {setSnapshot(e.target.id)}}>
                                                <RiSurveyFill/> {truncateText(survey.title, 25)}
                                            </p>
                                            {!survey.paid && <>
                                                <Link to={`/survey/payment/${survey?.package}/${survey?.public_id}`} className="survey__actions">Pay</Link>
                                                <div id={survey?.public_id} onClick = {(e) => deleteSurvey(e)} className="survey__actions delete">Delete</div>
                                                </>
                                            }
                                         </div>
                                    })}
                                </div>
                            </div>
                            <div className="stat__section">
                                <div className="surveys__number">
                                    <p>{researcherData?.completedSurveys?.length}</p>
                                </div>
                                <h3>Completed Surveys</h3>
                                <div className="surveys__links">
                                    {researcherData?.completedSurveys?.length > 0 && researcherData.completedSurveys.slice(0,4).map(survey => {
                                        return survey.paid && <p id={survey.public_id} key={uniqid()}><RiSurveyFill/> {truncateText(survey.title, 25)}</p>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="survey__info">
                                {
                                    snapShot && <SurveySnapshot />
                                }
                        </div>
                    </div>}
                </section>
            </div>  : <div className="survey__loader"><img src={loader} alt="loader"/></div> }
        </section>
    )
}

export default ResearcherAccount;