import { createContext } from 'react';
import { useState } from 'react';

const ResearcherContext = createContext();

const ResearcherProvider= ({children}) => {
    const [isLoaded, setLoaded] = useState(false);
    const [updateResearcher, setUpdateResearcher] = useState(false);
    const [showPackages, setShowPackages] = useState(false);
    const [researcherData, setResearcherData] = useState(
        {
            public_id: "", last_name: "", first_name: "", phone: "",
            email: "", country: "", institution: "", role: "", completedSurveys: "", activeSurveys: ""
        }
    );
    const [snapShot, setSnapshot] = useState("");
    return <ResearcherContext.Provider 
        value = {{
            isLoaded, 
            setLoaded, 
            updateResearcher, 
            setUpdateResearcher, 
            showPackages, 
            setShowPackages, 
            researcherData, 
            setResearcherData,
            snapShot, 
            setSnapshot
        }}
    >
        {children}
    </ResearcherContext.Provider>
}

export default ResearcherProvider;
export {ResearcherContext};
