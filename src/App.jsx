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
import BalancePage from './pages/BalancePage'
import BuyPlatePage from './pages/BuyPlatePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import PageNotFoundPage from './pages/PageNotFoundPage'

function App() {
  const {login} = useAuth();

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>

      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/plate/view/:id" element={<ViewPlatePage/>}/>
     
        <Route path="/dashboard" element={<Home/>}/>
     
      <Route element={<ProtectedRoute roles={['CUSTOMER']}/>}>
        <Route path="/my-plates/:id" element={<ViewCustomerPlatesPage/>}/>
        <Route path="/my-balance/:id" element={<BalancePage/>}/>
        <Route path="/buy-plate/:id" element={<BuyPlatePage/>}/>
      </Route>
      <Route element={<ProtectedRoute roles={['ADMIN']}/>}>
        <Route path="/register-plate" element={<RegisterPlatePage/>}/>
        <Route path="/plate/edit/:id" element = {<EditPlatePage/>}/>
        <Route path="/transactions" element={<TransactionPage/>}/>
      </Route> 
      <Route path="*" element={<PageNotFoundPage/>}/>
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
