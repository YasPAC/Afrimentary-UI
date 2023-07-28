import { createContext, useState} from 'react';

const ResearcherContext = createContext();

const ResearcherProvider= ({children}) => {
    const [isLoaded, setLoaded] = useState(false);
    const [updateResearcher, setUpdateResearcher] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [researcherData, setResearcherData] = useState(
        {
            public_id: "", last_name: "", first_name: "", phone: "",
            email: "", country: "", institution: "", role: "", 
            completedSurveys: "", activeSurveys: "", packages: ""
        }
    );
    const [snapShot, setSnapshot] = useState("");
    const [openSidebar, setOpenSidebar] = useState(false);
    return <ResearcherContext.Provider 
        value = {{
            isLoaded,
            setLoaded,
            updateResearcher,
            setUpdateResearcher,
            showDashboard,
            setShowDashboard,
            researcherData,
            setResearcherData,
            snapShot,
            setSnapshot,
            openSidebar,
            setOpenSidebar
        }}
    >
        {children}
    </ResearcherContext.Provider>
}

export default ResearcherProvider;
export {ResearcherContext};
