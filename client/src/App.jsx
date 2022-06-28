import './App.css'
import NavigationBar from './components/NavigationBar'
import ResetPassword from './components/ResetPassword'
import ForgotPassword from './components/ForgotPassword'
import Register from './components/Register'
import Login from './components/Login'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import VerifyEmail from './components/VerifyEmail'

//static pages import here
import { Home } from '../static_pages/Home'
import { About } from '../static_pages/About'
import { Services } from '../static_pages/Services'
import { Contact } from '../static_pages/Contact'


function App() {
  return (
    <div>
 
 <Router>

        <NavigationBar />
      <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
         
          <Route path="/register" aseSensitive={false}  element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} /> 
          <Route path="/forgot-password" element={<ForgotPassword />} />  
          <Route path="/verify-email" element={<VerifyEmail />} />  
       </Routes>
 </Router>
        
    </div>
  )
}

export default App
