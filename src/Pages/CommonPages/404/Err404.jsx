import "./err404.css";
import {Link} from "react-router-dom";
import sad404 from "../../../assets/sad404.svg";
const NotFound = () => {
    return (
        <main className='oopss'>
            <div className='error-text'>
                <span>4<img src={sad404} alt="404" />4</span>
                <p className="p-a">
                    Page not be found!
                </p>
                <Link className="back" to="/">Back to Home</Link>
            </div>
    </main>
    )
}
export default NotFound;