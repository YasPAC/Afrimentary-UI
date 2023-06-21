import { useState, useEffect, useRef} from 'react';
import useAuth from '../../Hooks/useAuth';
import "./login.css";
import {Link, useNavigate, useLocation} from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import busy from "../../assets/busy.gif";
import loading from "../../assets/loading.gif";
import dash from "../../assets/sitting.jpg";

const LoginSignupComponent = () => {
    const cookies = new Cookies();
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // Nav to prev protected path otherwise home
    const from = location.state?.from?.pathname

    const [isRespondent, setIsRespondent] = useState(true);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
    const emailRef = useRef();
    const errRef = useRef();

    useEffect(() => {
            emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMsg("")
    }, [loginData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (isRespondent) {
            const axiosConfig = {
                method: "post",
                url: "https://afrimentary.onrender.com/API/respondents/login",
                auth: {
                    username: loginData.email,
                    password: loginData.password
                },
                // headers: {'Authorization': 'Basic Auth'}
            }
            axios(axiosConfig)
            .then(response => {
                const accessToken = response?.data?.Token;
                const publicId = response?.data?.public_id;
                const userRole = response?.data?.role;
                // Set cookies
                cookies.set("token", accessToken, {path: "/", sameSite: "None", secure:true});
                cookies.set("public_id", publicId, {path: "/", sameSite: "None", secure:true});
                cookies.set("role", userRole, {path: "/", sameSite: "None", secure:true});
                setAuth({userId: publicId, token: accessToken, role: userRole});
                // Reset login form
                setLoginData({ email: '', password: '' });
                navigate(from || `/respondent/${publicId}`, {replace: true});
                setIsLoading(false);
            })
            .catch(err => {
                const error = err?.response?.data;
                if(error == "Incorrect Email") {
                    setErrorMsg("Sorry! Email doesn't exist");
                } else if (error == "Incorrect password") {
                    setErrorMsg("Sorry! Incorrect password");
                } else if (!error) {
                    setErrorMsg("Unable to login! Please try again");
                } else {
                    setErrorMsg(error);
                }
                errRef.current.focus();
                setIsLoading(false);
            });
        } 
        // else {
        //     const axiosConfig = {
        //         method: "post",
        //         url: "https://afrimentary.onrender.com/API/researchers/login",
        //         auth: {
        //             username: loginData.email,
        //             password: loginData.password
        //         },
        //         // headers: {'Authorization': 'Basic Auth'}
        //     }
        //     axios(axiosConfig)
        //     .then(response => {
        //         console.log("Success")
        //         const token = response.data.Token;
        //         // Reset login form
        //         setLoginData({ email: '', password: '' });
        //     })
        //     .catch(err => {
        //         setErrorMsg(err.response.data);
        //     });
        // }
    };

  return (
    <section className="afrimentary__login">
        <div className="login__inner">
            <div className="login__intro">
                <img src={dash} alt="afrimentary"/>
                <div className="login__cover"></div>
                <div className="intro__description">
                    <h2>Welcome back to <span className="description__greens">Afrimentary</span></h2>
                    <p>Stay connected, login to continue.</p>
                </div>
            </div>
            <div className="login__form">
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                {isLoading && <img className="loadingMsg" src={loading} alt="logging-in"/>}
                <h3>Login</h3>
                <p className="login__register">Don't have an account? <Link to="/signup">Register</Link></p>
                <div className="login__toggle">
                    <div 
                        className = {isRespondent ? `toggle__button toggle__button-respondent active` : `toggle__button toggle__button-respondent`}
                        onClick={() => {setIsRespondent(true)}}
                    >
                        <p>As Respondent</p>
                    </div>
                    <div 
                        className={!isRespondent ? `toggle__button toggle__button-researcher active` : `toggle__button toggle__button-researcher`}
                        onClick={() => {setIsRespondent(false)}}
                        >
                        <p>As Researcher</p>
                    </div>
                </div>
                {isRespondent ? 
                <form className="respondent__form" onSubmit={handleSubmit}>
                    <div className="form__field">
                        <label htmlFor="respondent_email">Email</label>
                        <input 
                            onChange={handleChange}
                            name="email"
                            type="email"
                            required
                            value={loginData.email}
                            id="respondent_email"
                            ref={emailRef}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form__field">
                        <label htmlFor="respondent_password">Password</label>
                        <input 
                            onChange={handleChange}
                            name="password"
                            type="password"
                            required
                            value={loginData.password}
                            id="respondent_password"
                        />
                    </div>
                    <div className="submission__field">
                        <div className="forgot_password"><Link to={isRespondent ? "/" : "/"}>Forgot password?</Link></div>
                        <button className="form__submit" type="submit">Login</button>
                    </div>
                </form> 
                : 
                    <div className="coming-soon">
                        <h2>We are working on this!</h2>
                        <img className="busy__gif" src={busy} alt="busy-gif" />
                    </div>
                }
            </div>
        </div>
    </section>
  );
};

export default LoginSignupComponent;
