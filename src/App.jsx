import './App.css';
import { Layout, RequireAuth } from './Components';
import {Home, LoginSignupComponent, NotFound, RespondentAccount, Signup, Unauthorized, Terms, About} from "./Pages";
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
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="terms" element={<Terms />} />
          <Route path="about" element={<About />} />
        
          {/* Protected Routes */}
          <Route element={<RequireAuth roles={["user", "admin", "associate"]} />}>
            <Route path="respondent/:id" element={<RespondentAccount />} />
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
