import "./researcheraccount.css";
import loader from "../../../assets/loader_2.gif";
import {Header, ResearcherSidebar, ResearcherUpdateForm} from "../../../Components";
import Packages from "./Packages";
import SurveySnapshot from "./SurveySnapshot";
import { useContext, useEffect, useState } from "react";
import {RiCloseLine} from "react-icons/ri";
import axios from "axios";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import uniqid from "uniqid";
import  {ResearcherContext} from "../../../Context/ResearcherAccountContext";
import {RiSurveyFill} from "react-icons/ri"

const ResearcherAccount = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const {id} = useParams();
    const {
        isLoaded, setLoaded, updateResearcher, setUpdateResearcher, 
        showPackages,  setShowPackages, researcherData, setResearcherData, snapShot, setSnapshot
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
    }, []);

    //Close the packages and info update form
    const close = () => {
        showPackages ? setShowPackages(false): null;
        updateResearcher ? setUpdateResearcher(false): null;
    }
    return (
        <section className="researcher__account">
            <Header />
            {isLoaded ?
            <div className="researcher__dash">
                <section className="researcher__dash-sidebar">
                    <ResearcherSidebar data={researcherData} closeAll={close} fetchData={fetchData}/>
                </section>
                <section className="researcher__main">
                    {updateResearcher && <ResearcherUpdateForm data={researcherData} token={token} fetchData={fetchData} />}
                    {(showPackages || updateResearcher) && <div className="update__close" onClick={close} >
                        <RiCloseLine  color={"green"} size={48}/>
                    </div>}
                    {showPackages && <Packages  />}
                    <div className="researcher__stats">
                        <div className="survey__groups">
                            <div className="stat__section">
                                <div className="surveys__number">
                                    <p>{researcherData?.activeSurveys?.length}</p>
                                </div>
                                <h3>Active Surveys</h3>
                                <div className="surveys__links">
                                    {researcherData?.activeSurveys?.length > 0 && researcherData.activeSurveys.map(survey => {
                                        return <p  id={survey.public_id} key={uniqid()} onClick={(e) => {setSnapshot(e.target.id)}}><RiSurveyFill/> {survey.title}</p>
                                    })}
                                </div>
                            </div>
                            <div className="stat__section">
                                <div className="surveys__number">
                                    <p>{researcherData?.completedSurveys?.length}</p>
                                </div>
                                <h3>Completed Surveys</h3>
                                <div className="surveys__links">
                                    {researcherData?.completedSurveys?.length > 0 && researcherData.completedSurveys.map(survey => {
                                        return <p id={survey.public_id} key={uniqid()}><RiSurveyFill/> {survey.title}</p>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="survey__info">
                                {
                                    snapShot && <SurveySnapshot />
                                }
                        </div>
                    </div>
                </section>
            </div>: <div className="survey__loader"><img src={loader} alt="loader"/></div> }
        </section>
    )
}

export default ResearcherAccount;