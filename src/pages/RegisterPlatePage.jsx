import React from 'react'
import StandardRegPlateInput from '../components/StandardRegPlateInput';
import { useRef, useState } from 'react';




const RegisterPlatePage = () => {
    const [values, setValues] = useState(['', '', '']);
    const [errors, setErrors] = useState([false, false, false]);  

    const regplateProps = {values, setValues, errors, setErrors}

 
  return(
    <form>
    <h3>Register a new plate</h3>
    <div className = "form-group">
    <label className = "inline">Registration number:</label>
    <StandardRegPlateInput props={regplateProps}/>
    </div>
    </form>
  )
  
}

export default RegisterPlatePage