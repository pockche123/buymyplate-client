import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/Navbar/Navbar'
import RegisterPlatePage from './pages/RegisterPlatePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import EditPlatePage from './pages/EditPlatePage'
import ViewPlatePage from './pages/ViewPlatePage'
import TransactionPage from './pages/TransactionPage'
import { useAuth } from './context/AuthContext'
import ViewCustomerPlatesPage from './pages/ViewCustomerPlatesPage'

function App() {
  const {login} = useAuth();

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register-plate" element={<RegisterPlatePage/>}/>
      <Route path="/plate/edit/:id" element = {<EditPlatePage/>}/>
      <Route path="/plate/view/:id" element={<ViewPlatePage/>}/>
      <Route path="/transactions" element={<TransactionPage/>}/>
      <Route path="/my-plates/:id" element={<ViewCustomerPlatesPage/>}/>
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
