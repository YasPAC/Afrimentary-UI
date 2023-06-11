import './App.css'
import { Layout } from './Components'
import {Home, LoginSignupComponent, NotFound, RespondentAccount} from "./Pages"
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="afrimentary__main">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="login" element={<LoginSignupComponent />} />
          <Route path="signup" element={<LoginSignupComponent />} />
        </Route>
        {/* Protected Routes */}
          <Route path="respondent/:id" element={<RespondentAccount />} />
        {/* Catch 404 */}
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App
