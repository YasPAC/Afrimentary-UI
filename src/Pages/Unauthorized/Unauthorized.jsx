import "./unauthorized.css";
import unauthorized from "../../assets/unauthorized.jpg";
import {Link, useNavigate} from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    const back = () => navigate(-1);

    return (
        <main className="afrimentary__unauthorized">
            <img src={unauthorized} alt="anauthorised" />
            <button onClick={back}>Go Back</button>
        </main>
    )
}

export default Unauthorized;