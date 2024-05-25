import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import WardenDashboard from "./pages/warden/WardenDashboard";
import LandingPage from "./pages/LandingPage";
import CheckStatus from "./pages/student/CheckStatus";
import History from "./pages/student/History";
import AddParent from "./pages/student/AddParent";
const WardenSignup = lazy(() => import("./pages/warden/WardenSignUp"));
const WardenSignIn = lazy(() => import("./pages/warden/WardenSignIn"));
const ParentSignIn = lazy(() => import("./pages/parent/ParentSignIn"));
const ParentSignUp = lazy(() => import("./pages/parent/ParentSignUp"));
const ParentDashboard = lazy(() => import("./pages/parent/ParentDashboard"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const StudentSignIn = lazy(() => import("./pages/student/StudentSignIn"));
const StudentSignUp = lazy(() => import("./pages/student/StudentSignUp"));
const StudentDashboard = lazy(() => import("./pages/student/StudentDashboard"));
const LeaveApplication = lazy(() => import("./pages/student/LeaveApplication"));

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const [isWarden, setIsWarden] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        setIsVerified(true);
        const response = await axios.post("http://localhost:3000/general", {
          token,
        });
        if (response.data.type === "parent") {
          setIsParent(true);
        } else if (response.data.type === "student") {
          setIsStudent(true);
        } else if (response.data.type === "warden") {
          setIsWarden(true);
        }
      }
    };

    verifyUser();
  }, [token]);

  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          {isVerified && isParent && (
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
          )}
          <Route path="/parent/signin" element={<ParentSignIn />} />
          <Route path="/parent/signup" element={<ParentSignUp />} />
          <Route path="/warden/signup" element={<WardenSignup />} />
          <Route path="/warden/signin" element={<WardenSignIn />} />
          <Route path="/student/signin" element={<StudentSignIn />} />
          <Route path="/student/signup" element={<StudentSignUp />} />
          {isVerified && isWarden && (
            <Route path="/warden/dashboard" element={<WardenDashboard />} />
          )}
          {isVerified && isStudent && (
            <>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/leave" element={<LeaveApplication />} />
              <Route path="/student/status" element={<CheckStatus />} />
              <Route path="/student/history" element={<History />} />
              <Route path="/student/addparent" element={<AddParent />} />
            </>
          )}
          {
            isVerified && isStudent &&(
              <>
              <Route path="/parent/dashboard" element={<ParentSignIn />} />
              <Route path="/warden/dashboard" element={<WardenSignIn />} />
              </>
            )
          }
          {
            isVerified && isParent &&(
              <>
              <Route path="/student/dashboard" element={<StudentSignIn />} />
              <Route path="/warden/dashboard" element={<WardenSignIn />} />
              </>
            )
          }
          {
            isVerified && isWarden &&(
              <>
              <Route path="/student/dashboard" element={<StudentSignIn />} />
              <Route path="/parent/dashboard" element={<ParentSignIn />} />
              </>
            )
          }
          {
            setTimeout(
              ()=>{
                <Route path="*" element={<PageNotFound />} />
              },1000
            )
          } 
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
