import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";import { lazy, useEffect, useState } from 'react'
import axios from 'axios';
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


  useEffect(
    ()=>{
      const verifyUser = async ()=>{
        const token = localStorage.getItem("token");
          if(token){
            setIsVerified(true);
            const response = await axios.get('http://localhost:3000/general',
              {
                token
              }
            );
            if(response.type == "parent"){
              setIsParent(true);
            }else if(response.type == "student"){
              setIsStudent(true);
            }else if(response.type == "warden"){
              setIsWarden(true);
            }
          }
        }
      
      verifyUser();
      
    },[]
  )

  return (
    <BrowserRouter>
      <Routes>
        
        {isVerified && isParent &&(
        <Route path="/parent/dashboard" element={<ParentDashboard/>}></Route>
        )
        }
        <Route path="/parent/signin" element={<ParentSignIn/>}></Route>
        <Route path="/parent/signup" element={<ParentSignUp/>}></Route>
        <Route path="/warden/signup" element={<WardenSignup/>}></Route>
        <Route path="/warden/signin" element={<WardenSignIn/>}></Route>
        <Route path="*" element = {<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
