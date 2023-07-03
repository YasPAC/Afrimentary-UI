import "./updateform.css";
import {SignupFields} from "..";
import {EducationField} from "..";
import { useState, useContext } from "react";
import axios from "axios";
import { RespondentContext } from "../../Context/RespondentAccountContext";


const UpdateForm = ({token, fetchData}) => {
    const [errMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const {respondentData, setRespondentData} = useContext(RespondentContext);

    // Handle form values change
    const handleRespondentChange = (e) => {
        const {name, value} = e.target
        setRespondentData(prev => {
            return {...prev, [name]: value}
        });
        setErrorMsg("");
    }
    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const axiosConfig = {
            method: "put",
            url: `https://afrimentary.onrender.com/API/respondents/update`,
            data: respondentData,
            headers: {
                'Authorization': 'Basic Auth',
                'x-access-token': token
            }
        }
        axios(axiosConfig).then(response => {
            const success = response?.data?.message;
            setSuccessMsg(success);
            // Update the Data
            fetchData();
        }).catch(err => {
            const error = err?.response?.data?.message;
            setErrorMsg(error);
        });
    }
    return (
        <section className="info__update">
            {errMsg && <p className="info__server-responses">{errMsg}</p>}
            {successMsg && <p className="info__server-responses response-success">success</p>}
            <h4>Update profile Infomation</h4>
            <form className="info__update-form" onSubmit={handleSubmit}>
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Email", name: "email", type: "email"}} />
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Phone", name: "phone", type: "text"}} />
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Age", name: "age", type: "number"}} />
                <EducationField data={respondentData} handleChange={handleRespondentChange} />
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Language", name: "language", type: "text"}} />
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "City", name: "city", type: "text"}} />
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "County", name: "county", type: "text"}} />
                <SignupFields handleChange={handleRespondentChange} data={respondentData} fields={{label: "Country", name: "country", type: "text"}} />
                <div><button type="submit">Update</button></div>
            </form>
        </section>
    )
}

export default UpdateForm;