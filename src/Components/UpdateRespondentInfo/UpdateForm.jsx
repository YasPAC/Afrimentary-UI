import "./updateform.css";
import {SignupFields} from "../../Components";
import {EducationField} from "../../Components";
import { useState } from "react";
import axios from "axios";


const UpdateForm = ({token, data, fetchData}) => {
    const [errMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [updateData, setUpdateData] = useState({
        age: data.age,
        city: data.city,
        country: data.country,
        county: data.county,
        education_level: data.education_level, 
        email: data.email,
        language: data.language,
        phone: data.phone
    });

    // Handle form values change
    const handleRespondentChange = (e) => {
        const {name, value} = e.target
        setUpdateData(prev => {
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
            data: updateData,
            headers: {
                'Authorization': 'Basic Auth',
                'x-access-token': token
            }
        }
        axios(axiosConfig).then(response => {
            const success = response?.data?.message;
            setSuccessMsg(success);
        }).catch(err => {
            const error = err?.response?.data?.message;
            setErrorMsg(error);
        });
        // Update the Data
        fetchData();
    }
    return (
        <section className="respondent__update">
            {errMsg && <p className="respondent__server-responses">{errMsg}</p>}
            {successMsg && <p className="respondent__server-responses response-success">success</p>}
            <h4>Update profile Infomation</h4>
            <form className="respondent__update-form" onSubmit={handleSubmit}>
                <SignupFields handleChange={handleRespondentChange} data={updateData} fields={{label: "Email", name: "email", type: "email"}} />
                <SignupFields handleChange={handleRespondentChange} data={updateData} fields={{label: "Phone", name: "phone", type: "text"}} />
                <SignupFields handleChange={handleRespondentChange} data={data} fields={{label: "Age", name: "age", type: "number"}} />
                <EducationField data={updateData} handleChange={handleRespondentChange} />
                <SignupFields handleChange={handleRespondentChange} data={updateData} fields={{label: "Language", name: "language", type: "text"}} />
                <SignupFields handleChange={handleRespondentChange} data={updateData} fields={{label: "City", name: "city", type: "text"}} />
                <SignupFields handleChange={handleRespondentChange} data={updateData} fields={{label: "County", name: "county", type: "text"}} />
                <SignupFields handleChange={handleRespondentChange} data={updateData} fields={{label: "Country", name: "country", type: "text"}} />
                <div><button type="submit">Update</button></div>
            </form>
        </section>
    )
}

export default UpdateForm;