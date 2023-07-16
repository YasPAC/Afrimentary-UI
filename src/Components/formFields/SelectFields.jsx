import uniqid from "uniqid";
import {Link} from "react-router-dom";
import {counties, countries} from "../../Utilities";
const ReferrerField = ({agents, data, handleChange}) => {
    return (
            <section className="form__field form__field-select">
                <label htmlFor="referee">Referred By</label>
                <select name="referred_by" id="referee" value={data.referred_by} onChange={handleChange}>
                    <option value="">Select Referrer</option>
                    <option value="self">Self Referral</option>
                    {agents.map(agent =>  {agent
                        return <option key={uniqid()} value={agent?.public_id}>{`${agent?.first_name} ${agent?.last_name}`} </option>})
                    }
                </select>
            </section>
    )
}
const EducationField = ({data, handleChange}) => {
    return (
        <section className="form__field form__field-select">
            <label htmlFor="education">Education Level</label>
            <select name="education_level" id="education" required value={data.education_level} onChange={handleChange}>
                <option value="">Select Education</option>
                <option value="Certificate">Certificate</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
            </select>
        </section>
    )
}
const GenderField = ({data, handleChange}) => {
    return (
        <section className="form__field form__field-select">
            <label htmlFor="education">Gender</label>
            <select name="gender" id="gender" required value={data.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
            </select>
        </section>
    )
}
const CheckBox = () => {
    return (
        <section className="form__field form__field-check">
            <input type="checkbox" name="terms&conditions" value="accepted" required/>
            <p>By signing in you are accepting the <Link to="/terms" target="_blank">terms and conditions</Link></p>
        </section>
    )
}

const Counties = ({data, handleChange}) => {
    return (
        <section className="form__field form__field-select">
            <label htmlFor="county"> County </label>
            <select name="county" id="county" required value={data.county} onChange={handleChange}>
                <option key={uniqid()} value="">Select--</option>
                {
                    counties.map(county => {
                        return <option key={uniqid()} value={county}>{county}</option>
                    })
                }
            </select>
        </section>
    )
}
const Countries = ({data, handleChange}) => {
    return (
        <section className="form__field form__field-select">
            <label htmlFor="country"> Country </label>
            <select name="country" id="country" required value={data.country} onChange={handleChange}>
                <option key={uniqid()} value="">Select--</option>
                {
                    countries.map(country => {
                        return <option key={uniqid()} value={country}>{country}</option>
                    })
                }
            </select>
        </section>
    )
}

const GeneralSelectField = ({options, fields, data, handleChange}) => {
    return (
        <section className="form__field form__field-select">
            <label htmlFor={fields.name}> {fields.label} </label>
            <select name={fields.name} id={fields.name} required value={data[fields.name]} onChange={handleChange}>
                {
                    options.map(opt => {
                        return <option key={uniqid()} value={opt.value}>{opt.label}</option>
                    })
                }
            </select>
        </section>
    )
}


export default ReferrerField;
export {EducationField, GenderField, CheckBox, GeneralSelectField, Counties, Countries};