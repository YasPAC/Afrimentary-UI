import './App.css';
import { Layout, RequireAuth } from './Components';
import {Home, LoginSignupComponent, NotFound, RespondentAccount, Signup} from "./Pages";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="afrimentary__main">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="login" element={<LoginSignupComponent />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="respondent/:id" element={<RespondentAccount />} />
        </Route>
        {/* Catch 404 */}
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App
