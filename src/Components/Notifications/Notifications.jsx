import "./notification.css";
import { RespondentContext } from "../../Context/RespondentAccountContext";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import uniqid from "uniqid";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const {token} = useContext(RespondentContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
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

    // Fetch notifications
    const fetchRespondentNotifications = () => {
        const notificationsConfig = requestConfig(`https://afrimentary.onrender.com/API/respondent/notifications`, "get");
        axios(notificationsConfig).then(response => {
            const unreadNotifications = response?.data?.unread;
            setNotifications(unreadNotifications);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            //
        });
    }

    // Mark notifications as read when clicked
    const readNotification = (e) => {
        const notificationId = e.target.id;
        const readConfig = requestConfig(`https://afrimentary.onrender.com/API/respondent/read/${notificationId}`, "put")
        const notificationToRead = notifications.filter(note => {return note.id === notificationId});
        setNotifications(prev => {
            return prev.filter(notification => {
                return notification.id != notificationId;
        })});
        axios(readConfig).then(response => {
            if (notificationToRead[0].subject === "New Survey") {
                navigate(`/survey/${notificationToRead[0].id}`);
            }
        }).catch(
            error => {
                // 
            }
        );
    }

    useEffect(() => {
        fetchRespondentNotifications();
    }, []);

    return (
        <>
        {!loading ? 
        <div className="notifications">
        {
            notifications.length > 0 ? 
            <>
            {notifications.map(notification => {
                return <div  key={uniqid()} className="notification">
                        <h6 className="notification__subject">{notification.subject}</h6>
                        <p className="notification__message">{notification.message}</p>
                        <p 
                        onClick={(readNotification)} 
                        id={notification.id} 
                        className={notification.subject == "New Survey" ? "read__note" : "read__note regular__note"}
                        >
                            {notification.subject == "New Survey" ? "Open": "Mark as read"}
                        </p>
                    </div>
                }
                )
            }
            </>
            : 
            <p className="no_notifications">No new notifications</p>
        }      
        </div> 
        : 
            <p className="idling">Loading notifications...</p> 
        }
        </> 
    )
}

export default Notifications;