
const SignupFields = ({handleChange, fields, data}) => {
    return ( 
            <section className="form__field">
                <label htmlFor={fields.name}>{fields.label}</label>
                <input 
                    onChange={handleChange}
                    name={fields.name}
                    type={fields.type}
                    required
                    value={data[fields.name]}
                    id={fields.name}
                />
            </section>
    )
}

export default SignupFields;