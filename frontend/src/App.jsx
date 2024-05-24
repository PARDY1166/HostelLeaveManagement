import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";import { lazy, useEffect, useState } from 'react'
import axios from 'axios';
import WardenDashboard from './pages/warden/WardenDashboard';
const WardenSignup = lazy(()=>import("./pages/warden/WardenSignUp"))
const WardenSignIn = lazy(()=>import("./pages/warden/WardenSignIn"))
const ParentSignIn = lazy(()=>import("./pages/parent/ParentSignIn"))
const ParentSignUp = lazy(()=>import("./pages/parent/ParentSignUp"))
const ParentDashboard = lazy(()=>import("./pages/parent/ParentDashboard"))
const PageNotFound = lazy(()=>(import("./pages/PageNotFound")))



function App() {

  const [isVerified,setIsVerified] = useState(false);
  const [isParent,setIsParent] = useState(false);
  const[isWarden,setIsWarden] = useState(false);
  const[isStudent,setIsStudent] = useState(false);
  // const [token,setToken] = localStorage.getItem("token");
  const token = localStorage.getItem("token");

  useEffect(
    ()=>{
      const verifyUser = async ()=>{
          if(token){
            setIsVerified(true);
            const response = await axios.post('http://localhost:3000/general',
              {
                token
              }
            );
            if(response.data.type === "parent"){
              setIsParent(true);
            }else if(response.data.type === "student"){
              setIsStudent(true);
            }else if(response.data.type === "warden"){
              setIsWarden(true);
            }
          }
        }
      
      verifyUser();
      
    },[token]
  )

  return (
    <BrowserRouter>
      <Routes>
        
        {isVerified && isParent &&(<Route path="/parent/dashboard" element={<ParentDashboard/>}></Route>)}
        <Route path="/parent/signin" element={<ParentSignIn/>}></Route>
        <Route path="/parent/signup" element={<ParentSignUp/>}></Route>
        <Route path="/warden/signup" element={<WardenSignup/>}></Route>
        <Route path="/warden/signin" element={<WardenSignIn/>}></Route>
        {isVerified && isWarden && <Route path="/warden/dashboard" element={<WardenDashboard/>}></Route>}
        <Route path="*" element = {<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
