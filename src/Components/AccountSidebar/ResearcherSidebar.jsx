import "./accountsidebar.css";
import { Link } from "react-router-dom";
import {RxDashboard} from "react-icons/rx";
import {MdDescription, MdOutlineSettings} from "react-icons/md";
import { ResearcherContext } from "../../Context/ResearcherAccountContext";
import { useContext } from "react";

const ResearcherSidebar = ({closeAll}) => {
    const {setOpenSidebar, showPackages, setUpdateResearcher, setShowPackages, researcherData} = useContext(ResearcherContext);
    const toggleUpdate = () => {
        setUpdateResearcher(prev => !prev);
        setShowPackages(false);
        setOpenSidebar(false);
    }
    const togglePackages = () => {
        setShowPackages(prev => !prev);
        setUpdateResearcher(false);
        setOpenSidebar(false);
    }
    const showDashboard = () => {
        setOpenSidebar(false);
        closeAll();
    }
    return (
        <>
            <div className="sidebar__info">
                <div>
                    <p className="name">{researcherData?.first_name} {researcherData?.last_name}</p>
                    <p className="institution">{researcherData?.institution}</p>
                    <p className="email">{researcherData?.email}</p>
                </div>
            </div>
            <hr />
            <div className="researcher__controls">
                <button className={!showPackages ?  "active": null} onClick={showDashboard}><RxDashboard /> Dashboard</button>
                <button className={showPackages ?  "active" : null} onClick={togglePackages}><MdDescription /> Packages</button>
            </div>
            <hr />
            <div className="sidebar__settings">
                <h5><MdOutlineSettings /> Settings</h5>
                <p className="setting" onClick={toggleUpdate}>Edit Profile</p>
                <p className="setting"><Link to={`/researcher/changepass/${researcherData?.public_id}`}>Change Password</Link></p>
            </div>
        </>
    );
}

export default ResearcherSidebar;