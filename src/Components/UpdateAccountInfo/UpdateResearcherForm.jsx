import "./updateform.css";
import {SignupFields} from "..";
import { useState, useContext } from "react";
import { ResearcherContext } from "../../Context/ResearcherAccountContext";
import axios from "axios";

const ResearcherUpdateForm = ({token, fetchData }) => {
    const {researcherData, setResearcherData} = useContext(ResearcherContext);
    const [errMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");



    //Input Change
    const handleResearcherChange = (e) => {
        const {name, value} = e.target;
        setResearcherData(prev => {return {...prev, [name]: value}});
        setErrorMsg("");
    }
    // Handle 
    const handleSubmit = (e) => {
        e.preventDefault();
        const updateConfig = {
            method: "put",
            url: `http://127.0.0.1:5000/API/researcher/update`,
            data: researcherData,
            headers: {
                'Authorization': 'Basic Auth',
                'x-access-token': token
            }
        }
        axios(updateConfig).then(
            response => {
                const success = response?.data?.message;
                setSuccessMsg(success);
                // Refetch Data
                 fetchData();
            }
        ).catch(
            error => {
                const err = error?.response?.data?.message;
                setErrorMsg(err);
            }
        )
    }

    return (
        <section className="info__update">
            {errMsg && <p className="info__server-responses">{errMsg}</p>}
            {successMsg && <p className="info__server-responses response-success">success</p>}
            <h4>Update profile Infomation</h4>
            <form className="info__update-form" onSubmit={handleSubmit}>
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Email", name: "email", type: "email"}} />
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Phone", name: "phone", type: "text"}} />
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Institution", name: "institution", type: "text"}} />
                <SignupFields handleChange={handleResearcherChange} data={researcherData} fields={{label: "Country", name: "country", type: "text"}} />
                <div><button type="submit">Update</button></div>
            </form>
        </section>
    )
}

export default ResearcherUpdateForm;