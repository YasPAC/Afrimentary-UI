import { createContext, useState } from "react";

const SurveyPaymentContext = createContext();

const SurveyPaymentProvider = ({children}) => {
    const [confirmPayment, setConfirmPayment] = useState(false);
    return (
        <SurveyPaymentContext.Provider
            value={{
                confirmPayment, setConfirmPayment
            }}
        >
        {children}
        </SurveyPaymentContext.Provider>
    )
}

export {SurveyPaymentContext, SurveyPaymentProvider};