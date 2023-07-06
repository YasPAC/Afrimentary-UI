import "./accountsidebar.css";
import { Link } from "react-router-dom";
import {RxDashboard} from "react-icons/rx";
import {MdDescription, MdOutlineSettings} from "react-icons/md";
import { ResearcherContext } from "../../Context/ResearcherAccountContext";
import { useContext } from "react";

const ResearcherSidebar = ({closeAll}) => {
    const {setOpenSidebar, showDashboard, setUpdateResearcher, setShowDashboard, researcherData} = useContext(ResearcherContext);
    const toggleUpdate = () => {
        setUpdateResearcher(prev => !prev);
        setShowDashboard(false);
        setOpenSidebar(false);
    }
    const togglePackages = () => {
        setShowDashboard(prev => !prev);
        setUpdateResearcher(false);
        setOpenSidebar(false);
    }
    const showPackages = () => {
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
                <button className={!showDashboard ?  "active" : null} onClick={showPackages}><MdDescription /> Packages</button>
                <button className={showDashboard ?  "active": null} onClick={togglePackages}><RxDashboard /> Dashboard</button>
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