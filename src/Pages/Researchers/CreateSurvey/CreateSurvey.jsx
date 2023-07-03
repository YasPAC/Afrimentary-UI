import { useParams } from "react-router-dom";

const CreateSurvey = () => {
    const {packages} = useParams();
    return (
        <section>
            <h1>{packages}</h1>
        </section>
    )
}

export default CreateSurvey;