import './App.css';
import { Layout, RequireAuth, AdminLayout } from './Components';
import {
  Home, LoginSignupComponent, NotFound, RespondentAccount, Signup, Unauthorized, 
  Terms, About, Contact, ChangePassword, RequestPassReset, PasswordReset, 
  SurveyResponse, ResearcherAccount, CreateSurvey, ChangeResearcherPassword,
  SurveyPayment, VerifyAccount, Admin, AdminRespondents, AdminResearchers, AdminSurveys, 
  SurveyResponses, AdminPackages, SendEmail
} from "./Pages";
import {Routes, Route} from "react-router-dom";
import ResearcherProvider from './Context/ResearcherAccountContext';
import RespondentProvider from './Context/RespondentAccountContext';
import { SurveyPaymentProvider } from './Context/SurveyPaymentContext';

function App() {
  return (
    <div className="afrimentary__main">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="login" element={<LoginSignupComponent />} />
          <Route path="signup" element={<Signup />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="terms" element={<Terms />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="requestreset" element={<RequestPassReset />} />
          <Route path="reset/:usertype/:token" element={<PasswordReset />} />
          <Route path="verify/:usertype/:token" element={<VerifyAccount />} />
        
          {/* Protected Routes/Role based authorization */}
          <Route element={<RequireAuth roles={["user", "admin", "associate"]} />}>
            <Route path="respondent/:id" element={<RespondentProvider><RespondentAccount /></RespondentProvider>} />
            <Route path="respondent/changepass/:id" element={<ChangePassword />} />
          </Route>
          <Route element={<RequireAuth roles={["user", "admin", "associate"]} />}>
            <Route path="survey/:id" element={<SurveyResponse />} />
          </Route>
          <Route element={<RequireAuth roles={["researcher"]} />}>
              <Route path="researcher/:id" element={<ResearcherProvider><ResearcherAccount /></ResearcherProvider>} />
              <Route path="researcher/changepass/:id" element={<ChangeResearcherPassword/>} />
              <Route path="survey/payment/:packages/:survey_id" element={<SurveyPaymentProvider><SurveyPayment /></SurveyPaymentProvider>} />
              {/* <Route path="confirm_payment/:packages/:survey_id" element={<ConfirmPayment />} /> */}
          </Route>
          <Route element={<RequireAuth roles={["researcher", "admin"]} />}>
            <Route path="survey/create/:packages" element={<CreateSurvey/>} />
          </Route>
          {/* Catch 404 */}
          <Route path="*" element={<NotFound />}/>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route  element={<RequireAuth roles={["admin"]} />}>
            <Route path=":id" element={<Admin />} />
            <Route path="respondents" element={<AdminRespondents />} />
            <Route path="researchers" element={<AdminResearchers />} />
            <Route path="surveys" element={<AdminSurveys/>} />
            <Route path="responses/:id" element={<SurveyResponses/>} />
            <Route path="packages" element={<AdminPackages/>} />
            <Route path="send_email" element={<SendEmail/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
