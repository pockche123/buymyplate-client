import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/Navbar/Navbar'
import RegisterPlate from './pages/RegisterPlate'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register-plate" element={<RegisterPlate/>}/>
    </Routes>
    </>
  )
}

export default App
