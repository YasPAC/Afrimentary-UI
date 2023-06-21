import anonymous from "../../assets/anonymous.png";
import { Link } from "react-router-dom";
import {RiEditLine,RiExchangeFill} from "react-icons/ri";
const Sidebar = ({data}) => {
    
    return (
        <>
            <div className="respondentsidebar__info">
                <img src={anonymous} alt="anonymous" />
                <div>
                    <p className="respondent__name">{data.first_name} {data.last_name}</p>
                    <p className="respondent__email">{data.email}</p>
                </div>
            </div>
            <hr />
            <div className="respondentsidebar__settings">
                <p><Link to="/">Edit Info <RiEditLine size={18} /> </Link></p>
                <p><Link to="/">Change Password <RiExchangeFill size={18}/></Link></p>
            </div>
        </>
    );
}

export default Sidebar;