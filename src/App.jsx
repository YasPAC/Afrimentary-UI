import './App.css';
import { Layout, RequireAuth } from './Components';
import {Home, LoginSignupComponent, NotFound, 
  RespondentAccount, Signup, Unauthorized, Terms, 
  About, Contact, ChangePassword, RequestPassReset,
  RespondentReset, SurveyResponse, ResearcherAccount, CreateSurvey, ChangeResearcherPassword} from "./Pages";
import {Routes, Route} from "react-router-dom";
import ResearcherProvider from './Context/ResearcherAccountContext';
import RespondentProvider from './Context/RespondentAccountContext';

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
          <Route path="respondent/reset/:token" element={<RespondentReset />} />
        
          {/* Protected Routes */}
          <Route element={<RequireAuth roles={["user", "admin", "associate"]} />}>
            <Route path="respondent/:id" element={<RespondentProvider><RespondentAccount /></RespondentProvider>} />
            <Route path="respondent/changepass/:id" element={<ChangePassword />} />
          </Route>
          <Route element={<RequireAuth roles={["user", "admin", "associate"]} />}>
            <Route path="survey/:id" element={<SurveyResponse />} />
          </Route>
          <Route element={<RequireAuth roles={["researcher"]} />}>
              <Route path="researcher/:id" element={<ResearcherProvider><ResearcherAccount /></ResearcherProvider>} />
              <Route path="survey/create/:packages" element={<CreateSurvey/>} />
              <Route path="researcher/changepass/:id" element={<ChangeResearcherPassword/>} />
          </Route>
          <Route  element={<RequireAuth roles={["admin"]} />}>
            <Route path="admin/:id" element={<RespondentAccount />} />
          </Route>
          {/* Catch 404 */}
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
