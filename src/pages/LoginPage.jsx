import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const {login} = useAuth()
    const navigate = useNavigate()
 

    const handleLogin = async(e) => {
        e.preventDefault()
        const body = {
            username: username,
            password: password
        }
        try {
            const result = await login(username, password)
            if(result.success){
                toast.success("Login successful!")
                navigate('/dashboard')
            } else{
                toast.error("Login failed. " + result.error)
            }
            
        } catch (error) {
            console.log(error)
            toast.error("Login error: " +  error.message)
        }
   

    }


  return (
    <div className="container mt-4">
        <h3>Enter login credentials:</h3>
      <div className="card my-3">
        <div className="card-body">
            <form onSubmit={handleLogin}>
                <div>
                <label>Username: </label>
                <input className='form-control' type="text" value={username} placeholder='Enter username' onChange={e => setUsername(e.target.value)}/>
                </div>
                <div>
                   <label>Password:</label>
                   <input className='form-control' type="text" value={password} placeholder='Enter password' onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className="btn btn-primary" type="submit" >Login</button>
            </form>
        </div>
        </div>
    </div>
  )
}

export default LoginPage