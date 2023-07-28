import "./sendEmail.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const SendEmail = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const [formData, setFormData] = useState({
        options: '',
        email: '',
        message: '',
        subject: ''
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    // Request configuration function
    const requestConfig = (data) => {
        const axiosConfig = {
        method: "post",
        url: "https://afrimentary.onrender.com/API/admin/send_emails",
        data: data,
        headers: {
            'Authorization': 'Basic Auth',
            'x-access-token': token
        }
        }
        return axiosConfig;
    }
    
    
    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios(requestConfig(formData)).then(res => {
            setSuccessMessage(res?.data?.message);
            setFormData({options: '', email: '', message: '', subject: ''});
        }
        ).catch(err => {
            setErrorMessage(err?.response?.data?.message);
        });
    };
    // Close error message & success message after 5seconds
    errorMessage && setTimeout(() => {setErrorMessage(false)}, 5000);
    successMessage && setTimeout(() => {setSuccessMessage(false)}, 5000);
    return (
       <section className="send__email">
            {errorMessage && <div className="all_lists-messages">{errorMessage}</div>}
            {successMessage && <div className="all_lists-messages success">{successMessage}</div>}
            <h3>Send Emails</h3>
            <div className="mail__container">
                <form onSubmit={handleSubmit}>
                    <div className="radio__buttons">
                        <label className="button__label">
                        <input
                            type="radio"
                            name="options"
                            value="single"
                            checked={formData.options === 'single'}
                            required
                            onChange={handleInputChange}
                        />
                        Single
                        </label>
                        <label className="button__label">
                        <input
                            type="radio"
                            name="options"
                            required
                            value="respondents"
                            checked={formData.options === 'respondents'}
                            onChange={handleInputChange}
                        />
                        Respondents
                        </label>
                        <label className="button__label">
                        <input
                            required
                            type="radio"
                            name="options"
                            value="researchers"
                            checked={formData.options === 'researchers'}
                            onChange={handleInputChange}
                        />
                        Researchers
                        </label>
                    </div>
                    {formData.options === "single" && <div>
                        <label className="field__container">
                        Email:
                        <input
                            required
                            autoComplete="off"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        </label>
                    </div>}
                    <label className="field__container">
                        Subject:
                        <input
                            required
                            autoComplete="off"
                            type="rext"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                        />
                        </label>
                    <div>
                        <label className="field__container">
                        Message:
                        <textarea
                            required
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="5"
                        />
                        </label>
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
       </section>
    )
}

export default SendEmail;