import React from 'react'
import StandardRegPlateInput from '../components/StandardRegPlateInput';
import { useRef, useState } from 'react';
import '../assets/button.css'



const RegisterPlatePage = () => {
    const [values, setValues] = useState(['', '', '']);
    const [errors, setErrors] = useState([false, false, false]);  
    const regplateProps = {values, setValues, errors, setErrors}
    const [price, setPrice] = useState(0)
    const [available, setAvailable] = useState(true)
    let strErrMessage = "Letters only accepted"
    let numErrMessage = "Numbers only accepted"


    const renderErrors = () => {
      if (!errors.some(err => err)) return null;
    
      return (
        <>
          <h3>Error Found:</h3>
          {errors[1] ? (
            <li>{numErrMessage}</li>
          ) : (
            <li>{strErrMessage}</li>
          )}
        </>
      );
    };

    const handlePriceInput = (e) => {
      const value = e.target.value;

      if (isNaN(value) || value === "") {
        return; // If it's not a number, don't update the state
      }
    
    
        setPrice(value); // Allow empty input or positive numbers
      
    }
    


 
  return(
    <>
      
     <h3>Register a new pate - Standard</h3>
  
      {renderErrors()}
   
    <form>
    <div className = "form-group">
    <label className = "inline">Registration number:</label>
    <StandardRegPlateInput props={regplateProps}/>
    </div>
    <div className ="form-group">
      <label htmlFor="plate-price">Price:</label>
      <input name="plate-price"  type="text" value={price} onChange={handlePriceInput} />
    </div>
    <div className="form-group">
      <label htmlFor="">Available: </label>
    <label className="switch">
          <input type="checkbox" checked={available} onChange={(e) =>setAvailable(e.target.checked)}/>
            <span className="slider round"></span>
          </label>
    </div>

    
    </form>
    </>
  )
  
}

export default RegisterPlatePage