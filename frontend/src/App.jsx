import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signin from './pages/parent/SignIn'
import ParentDashboard from './pages/parent/ParentDashboard'
import Signup from './pages/parent/SignUp'
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/parent/dashboard" element={<ParentDashboard/>}></Route>
        <Route path="/parent/signin" element={<Signin/>}></Route>
        <Route path="/parent/signup" element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
