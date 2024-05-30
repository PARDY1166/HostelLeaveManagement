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
import StudentProfile from "./pages/student/StudentProfile";
import WardenProfile from "./pages/warden/WardenProfile";
import ParentProfile from "./pages/parent/ParentProfile";

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
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const response = await axios.post("http://localhost:3000/general", { token });
          setUserType(response.data.type);
          setIsVerified(true);
        } catch (error) {
          console.error("Error verifying user:", error);
          setIsVerified(false);
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/parent/signin" element={<ParentSignIn />} />
          <Route path="/parent/signup" element={<ParentSignUp />} />
          <Route path="/warden/signup" element={<WardenSignup />} />
          <Route path="/warden/signin" element={<WardenSignIn />} />
          <Route path="/student/signin" element={<StudentSignIn />} />
          <Route path="/student/signup" element={<StudentSignUp />} />

          {isVerified && userType === "parent" && (
            <>
              <Route path="/parent/dashboard" element={<ParentDashboard />} />
              <Route path="/profile" element={<ParentProfile />} />
            </>
          )}
          {isVerified && userType === "warden" && (
            <>
              <Route path="/warden/dashboard" element={<WardenDashboard />} />
              <Route path="/profile" element={<WardenProfile />} />
            </>
          )}
          {isVerified && userType === "student" && (
            <>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/leave" element={<LeaveApplication />} />
              <Route path="/student/status" element={<CheckStatus />} />
              <Route path="/student/history" element={<History />} />
              <Route path="/student/addparent" element={<AddParent />} />
              <Route path="/profile" element={<StudentProfile />} />
            </>
          )}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
