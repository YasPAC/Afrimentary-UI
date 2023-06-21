import "./updateform.css";
import {SignupFields} from "../../Components";
import {EducationField} from "../../Components";
import { useState } from "react";


const UpdateForm = ({close}) => {
    const [respondentData, setRespondentData]  = useState(
        {
            age: "",
            education: "",
            phone: "",
            email: "",
            language: "",
            city: "",
            county: "",
            country: "",
        }
    );
    // Handle form values change
    const handleRespondentChange = (e) => {
        const {name, value} = e.target
        setRespondentData(prev => {
            return {...prev, [name]: value}
        });
    }
    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <section className="respondent__update">
            
            <h4>Update profile Infomation</h4>
            <form className="respondent__update-form" onSubmit={handleSubmit}>
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