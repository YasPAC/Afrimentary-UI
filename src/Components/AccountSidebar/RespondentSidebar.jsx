import "./accountsidebar.css";
import { Link } from "react-router-dom";
import {MdOutlineSettings} from "react-icons/md";
import { useContext } from "react";
import { RespondentContext } from "../../Context/RespondentAccountContext";

const Sidebar = ({update}) => {
    const {respondentData} = useContext(RespondentContext);
    return (
        <>
            <div className="sidebar__info">
                <div>
                    <p className="name">{respondentData?.first_name} {respondentData?.last_name}</p>
                    <p>{respondentData.city}, {respondentData.country}</p>
                    <p className="email">{respondentData?.email}</p>
                </div>
            </div>
            <div className="sidebar__settings">
            <h5><MdOutlineSettings /> Settings</h5>
                <p className="setting" onClick={update}>Edit Profile</p>
                <p className="setting"><Link to={`/respondent/changepass/${respondentData?.public_id}`}>Change Password</Link></p>
            </div>
        </>
    );
}

export default Sidebar;