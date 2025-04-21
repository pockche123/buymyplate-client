import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/Navbar/Navbar'
import RegisterPlatePage from './pages/RegisterPlatePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register-plate" element={<RegisterPlatePage/>}/>
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
