import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signin from './pages/parent/SignIn'
import ParentDashboard from './pages/parent/ParentDashboard'
import Signup from './pages/parent/SignUp'
import "react-toastify/dist/ReactToastify.css";import { lazy } from 'react'
const WardenSignup = lazy(()=>import("./pages/warden/WardenSignUp"))
const WardenSignIn = lazy(()=>import("./pages/warden/WardenSignIn"))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/parent/dashboard" element={<ParentDashboard/>}></Route>
        <Route path="/parent/signin" element={<Signin/>}></Route>
        <Route path="/parent/signup" element={<Signup/>}></Route>
        <Route path="/warden/signup" element={<WardenSignup/>}></Route>
        <Route path="/warden/signin" element={<WardenSignIn/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
