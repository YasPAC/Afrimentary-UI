import { createContext, useState} from 'react';

const RespondentContext = createContext();

const RespondentProvider = ({children}) => {
    const [respondentData, setRespondentData] = useState({
        age: "", city: "", country: "", county: "", education_level: "", email: "", first_name: "",
        gender: "", language: "", last_name: "", phone: "", public_id: "", role: "", verified: "", surveys: ""
    });
    const [referred, setReferred] = useState(0);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [updateRespondent, setUpdateRespondent] = useState(false);
    return (
        <RespondentContext.Provider
            value={{
                respondentData, 
                setRespondentData,
                referred, 
                setReferred,
                openSidebar, 
                setOpenSidebar,
                updateRespondent, 
                setUpdateRespondent
            }}
        >
            {children}
        </RespondentContext.Provider>
    )
}

export default RespondentProvider;
export {RespondentContext};