import "./accountsidebar.css";
import { Link } from "react-router-dom";
import {MdOutlineSettings} from "react-icons/md";

const Sidebar = ({data, update, packages}) => {
    return (
        <>
            <div className="sidebar__info">
                <div>
                    <p className="name">{data?.first_name} {data?.last_name}</p>
                    {data?.institution && <p className="institution">{data?.institution}</p>}
                    <p className="email">{data?.email}</p>
                </div>
            </div>
            {data.role === "researcher" &&
                <>
                    <hr />
                    <div className="researcher__controls">
                        <button onClick={packages}>Packages</button>
                        <button onClick={packages}>My Surveys</button>
                    </div>
                </>
            }
            <div className="sidebar__settings">
            <h5><MdOutlineSettings /> Settings</h5>
                <p className="setting" onClick={update}>Edit Profile</p>
                <p className="setting"><Link to={`/respondent/changepass/${data?.public_id}`}>Change Password</Link></p>
            </div>
        </>
    );
}

export default Sidebar;