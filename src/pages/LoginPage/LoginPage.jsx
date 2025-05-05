import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../assets/button.css'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        const body = {
            username: username,
            password: password
        }
        try {
            const result = await login(username, password)
            if (result.success) {
                toast.success("Login successful!")
                navigate('/dashboard')
            } else {
                toast.error("Login failed. " + result.error)
            }

        } catch (error) {
            console.log(error)
            toast.error("Login error: " + error.message)
        }


    }


    return (
        <div className="container mt-4">
            <h3>Enter login credentials:</h3>
            <div className="card my-3">
                <div className="card-body">
                    <form onSubmit={handleLogin}  data-testid="login-form">
                        <div className="input-group">
                            <label htmlFor="username">Username: </label>
                            <input
                                id="username"
                                className="form-control"
                                type="text"
                                value={username}
                                placeholder="Enter username"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                className="form-control password-input"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Enter password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <FontAwesomeIcon
                                className="password-toggle"
                                icon={showPassword ? faEyeSlash : faEye}
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        <button className="btn btn-primary" type="submit" >Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage