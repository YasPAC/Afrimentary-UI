import "./adminsidebar.css";
import {Link} from "react-router-dom";
import {menu, home, chart} from "../../Utilities";
import {RiLogoutCircleLine} from "react-icons/ri";
import uniqid from "uniqid";
import useAuth from "../../Hooks/useAuth";


const AdminSidebar = () => {
    const {auth} = useAuth();
    return (
        <section className="admin__sidebar">
            <Link to="/" className="admin__header">Afrimentary</Link>
            <div key={uniqid()} className="sidebar__item">
                <h4 className="item__title">Main</h4>
                <Link key={uniqid()} to="/" className="item__link"><img src={home} />Home</Link> 
                <Link key={uniqid()} to={`/admin/${auth?.userId}`} className="item__link"><img src={chart} />Dashboard</Link> 
            </div>
            {menu.map(item => (
                <div key={uniqid()} className="sidebar__item">
                    <h4 className="item__title">{item.title}</h4>
                        {
                        item.listItems.map(listItem => (
                            <Link key={uniqid()} to={listItem.url} className="item__link"><img src={listItem.icon} />{listItem.title}</Link> 
                        ))
                    } 
                </div>
            ))
            }
            <div className="item__link admin__logout">
                <RiLogoutCircleLine color="#fff" size="16px" /> Logout
            </div>
        </section>
    )
}

export default AdminSidebar;