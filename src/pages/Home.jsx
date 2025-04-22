import React, { useEffect, useState } from 'react'
import { getVehiclePlatesByInput } from '../api/vehiclePlateApi'
import SearchPlateForm from '../components/SearchPlateForm'
import SearchInputResults from '../components/SearchInputResults'

const Home = () => {

  const [regInput, setRegInput] = useState('')
  const [regArr, setRegArr]  = useState([])
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async(e) => {
    e.preventDefault()
     await getVehiclePlatesByInput(regInput)
          .then(res =>{
            setIsLoading(true);
            console.log("this is arr: " , res.data.content)
            setRegArr(res.data.content)
          }
          
          )
          .catch(e => console.log(e))
          setIsLoading(false)

  }



  return (
    <>
    <h3>Search for a reg plate</h3>
    <SearchPlateForm handleSubmit={handleSubmit} regInput={regInput} setRegInput={setRegInput}/>
    {isLoading && <p>Loading results...</p>}
    {regArr && regArr.length > 0 && (
      <SearchInputResults regArr={regArr}/>
  
    )}
    </>
  )
}

export default Home