import React from 'react'
import { useRef, useState } from 'react';


const StandardRegPlateInput = ({props}) => {
    const {values, setValues, errors, setErrors} = props

    const refs = [useRef(), useRef(), useRef()];  // Refs for each input box
  
    // Handle the change for each box
    const handleChange = (index, e) => {
      let val = e.target.value.toUpperCase();  // Convert to uppercase
      val = index === 1 ? val.slice(0, 3) : val.slice(0, 2); // Limit input length for each box
  
      let isValid = true;
      console.log("VAL: " , val)
      // Validation logic based on the input box index
      if (index === 0) {
        // Second box should only have numbers
        isValid = /^[0-9]{0,2}$/.test(val) ;  // Allow up to 2 digits for the second box
      } else {
        // First and third boxes should only have letters
        isValid = /^[A-Z]{0,3}$/.test(val);  // Allow up to 2 letters for first/third box
      }
  
      // Update the errors array by copying the previous errors and updating the current index
      const updatedErrors = [...errors];
      updatedErrors[index] = !isValid;  // Set error to true if the input is invalid
  
      // Update the values array
      const updatedValues = [...values];
      updatedValues[index] = val;  // Update the value of the current box
  
      // Set the updated values and errors to state
      setValues(updatedValues);
      setErrors(updatedErrors);
  
      // If the value is filled and it's not the last box, focus the next box
      if (val.length === (index === 1 ? 3 : 2) && index < refs.length - 1) {
        refs[index + 1].current?.focus();
      }
    };
   
     // Handle backspace for moving focus to the previous box
     const handleKeyDown = (index, e) => {
       if (e.key === 'Backspace' && values[index] === '' && index > 0) {
         const updated = [...values];
         updated[index - 1].slice(0, updated[index - 1].length - 1);

         setValues(updated);
         refs[index - 1].current?.focus();  // Focus the previous box
       }
     };
  
     const placeholders = ['NN', 'LLL'];
   
     return (
      <>
         {values?.map((val, idx) => (
           <input
             key={idx}
             ref={refs[idx]}
             value={val}
             onChange={(e) => handleChange(idx, e)}  // Handle input change
             onKeyDown={(e) => handleKeyDown(idx, e)}  // Handle key down event
             style={{
               width: idx === 1 ? '5rem' : '4rem',  // Adjust width for the last box
               height: '2.7rem',
               textAlign: 'center',
               fontSize: '1.5rem',
               textTransform: 'uppercase',
               border: `1px solid ${errors[idx] ? 'red' : '#ccc'}`,
               borderRadius: '0.5rem',
               backgroundColor: errors[idx] ? '#ffcccc' : 'white', // Red background for error
  
             }}
             placeholder={placeholders[idx]} 
           />
         ))}
  </>
     );
}

export default StandardRegPlateInput