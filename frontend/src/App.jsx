import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";import { lazy } from 'react'
const WardenSignup = lazy(()=>import("./pages/warden/WardenSignUp"))
const WardenSignIn = lazy(()=>import("./pages/warden/WardenSignIn"))
const ParentSignIn = lazy(()=>import("./pages/parent/ParentSignIn"))
const ParentSignUp = lazy(()=>import("./pages/parent/ParentSignUp"))
const ParentDashboard = lazy(()=>import("./pages/parent/ParentDashBoard"))



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/parent/dashboard" element={<ParentDashboard/>}></Route>
        <Route path="/parent/signin" element={<ParentSignIn/>}></Route>
        <Route path="/parent/signup" element={<ParentSignUp/>}></Route>
        <Route path="/warden/signup" element={<WardenSignup/>}></Route>
        <Route path="/warden/signin" element={<WardenSignIn/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
