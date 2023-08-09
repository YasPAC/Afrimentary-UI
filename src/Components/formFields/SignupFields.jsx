
const SignupFields = ({handleChange, fields, data, example}) => {
    return ( 
            <section className="form__field">
                <label htmlFor={fields?.name}>{fields?.label} {example && <span className="label__example">{example}</span>}</label>
                <input 
                    onChange={handleChange}
                    name={fields?.name}
                    type={fields?.type}
                    required
                    autoComplete="off"
                    value={data[fields?.name]}
                    id={fields?.name}
                />
            </section>
    )
}

export default SignupFields;