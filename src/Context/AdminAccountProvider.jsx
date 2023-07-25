import { createContext, useState } from "react";

const AdminContext = createContext();

const AdminContextProvider = ({children}) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    return <AdminContext.Provider
        value = {{
            successMessage,
            setSuccessMessage,
            errorMessage,
            setErrorMessage
        }}
    >
        {children}
    </AdminContext.Provider>
}
export default AdminContextProvider;
export {AdminContext}