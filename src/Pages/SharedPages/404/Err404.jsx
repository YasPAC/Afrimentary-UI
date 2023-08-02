import "./err404.css";
import {Link} from "react-router-dom";
import sad404 from "../../../assets/sad404.svg";
import { DocTitle } from "../../../Utilities";
const NotFound = () => {
    DocTitle("Page Not Found");
    return (
        <main className='oopss'>
            <div className='error-text'>
                <span>4<img src={sad404} alt="404" />4</span>
                <p className="p-a">
                    Page not found!
                </p>
                <Link className="back" to="/">Back to Home</Link>
            </div>
    </main>
    )
}
export default NotFound;