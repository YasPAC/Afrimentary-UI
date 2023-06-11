import { useState, useEffect, useRef} from 'react';
import useAuth from '../../Hooks/useAuth';
import "./login.css";
import {Link} from "react-router-dom";
import axios from "axios";

const LoginSignupComponent = () => {
    const {setAuth} = useAuth();
    const [isRespondent, setIsRespondent] = useState(true);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [errMsg, setErrorMsg] = useState("")
    const emailRef = useRef()
    const errRef = useRef()

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
        if (isRespondent) {
            const axiosConfig = {
                method: "post",
                url: "http://127.0.0.1:5000/API/respondents/login",
                auth: {
                    username: loginData.email,
                    password: loginData.password
                },
                // headers: {'Authorization': 'Basic Auth'}
            }
            axios(axiosConfig)
            .then(response => {
                const token = response?.data?.Token;
                const userId = response?.data?.public_id;
                setAuth({userId: userId, token: token})
                // Reset login form
                setLoginData({ email: '', password: '' });
            })
            .catch(err => {
            const error = err.response.data;
                if(error == "Incorrect Email") {
                    setErrorMsg("Sorry! Email doesn't exist");
                } else if (error == "Incorrect password") {
                    setErrorMsg("Sorry! Incorrect password");
                } else {
                    setErrorMsg(error);
                }
                errRef.current.focus();
            });
        } else {
            const axiosConfig = {
                method: "post",
                url: "http://127.0.0.1:5000/API/researchers/login",
                auth: {
                    username: loginData.email,
                    password: loginData.password
                },
                // headers: {'Authorization': 'Basic Auth'}
            }
            axios(axiosConfig)
            .then(response => {
                console.log("Success")
                const token = response.data.Token;
                // Reset login form
                setLoginData({ email: '', password: '' });
            })
            .catch(err => {
                setErrorMsg(err.response.data);
            });
        }
    };

  return (
    <section className="afrimentary__login">
        <div className="login__inner">
            <div className="login__intro">
                <div className="intro__description">
                    <h2>Welcome back to <span className="description__greens">Afrimentary</span></h2>
                    <p>Stay connected, log in with your personal information to continue.</p>
                </div>
            </div>
            <div className="login__form">
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                <h3>Login</h3>
                <p className="login__register">Don't have an account? <Link to="/">Register</Link></p>
                <div className="login__toggle">
                    <div 
                        className = {isRespondent ? `toggle__button toggle__button-respondent active` : `toggle__button toggle__button-respondent`}
                        onClick={() => {setIsRespondent(true)}}
                    >
                        <p>Login as Respondent</p>
                    </div>
                    <div 
                        className={!isRespondent ? `toggle__button toggle__button-researcher active` : `toggle__button toggle__button-researcher`}
                        onClick={() => {setIsRespondent(false)}}
                        >
                        <p>Login as Researcher</p>
                    </div>
                </div>
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
            </div>
        </div>
    </section>
  );
};

export default LoginSignupComponent;
