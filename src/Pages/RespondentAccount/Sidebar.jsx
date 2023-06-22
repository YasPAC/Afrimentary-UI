import { Link } from "react-router-dom";
import {RiEditLine, RiExchangeFill} from "react-icons/ri";

const Sidebar = ({data, update}) => {
    return (
        <>
            <div className="respondentsidebar__info">
                <div>
                    <p className="respondent__name">{data.first_name} {data.last_name}</p>
                    <p className="respondent__email">{data.email}</p>
                    <p className="respondent__id">#ID: {data.public_id}</p>
                </div>
            </div>
            <hr />
            <div className="respondentsidebar__settings">
                <p className="setting" onClick={update}>Edit Info <RiEditLine size={18} /></p>
                <p><Link to="/" className="setting">Change Password <RiExchangeFill size={18}/></Link></p>
            </div>
        </>
    );
}

export default Sidebar;