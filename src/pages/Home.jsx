import React, { useEffect, useState } from 'react'
import { getVehiclePlatesByInput } from '../api/vehiclePlateApi'

const Home = () => {

  const [regInput, setRegInput] = useState('')
  const [regArr, setRegArr]  = useState([])


 

  const handleSubmit = async(e) => {
    e.preventDefault()
     await getVehiclePlatesByInput(regInput)
          .then(res =>{
            console.log("this is arr: " , res.data.content)
            setRegArr(res.data.content)
          }
          
          )
          .catch(e => console.log(e))
  }



  return (
    <>
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reg-input"></label>
          <input name="reg-input"   id="reg-input" type="text" placeholder='Enter reg plate here' value={regInput} onChange={e => setRegInput(e.target.value)}/>
        </div>
        <button>Search</button>
    </form>
    {regArr && regArr.length > 0 && (
  <ul>
    {regArr.map((reg, index) => (
      <ul>
      <li key={index}>{reg?.plateNumber}, {'£'+reg?.price}, {reg?.available ? "available": "unavailable"}  </li>

      </ul>
      
    ))}
  </ul>
)}


    </>
  )
}

export default Home