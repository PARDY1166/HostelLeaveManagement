import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './pages/student/Dashboard'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
