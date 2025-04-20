import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/Navbar/Navbar'
import RegisterPlatePage from './pages/RegisterPlatePage'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register-plate" element={<RegisterPlatePage/>}/>
    </Routes>
    </>
  )
}

export default App
