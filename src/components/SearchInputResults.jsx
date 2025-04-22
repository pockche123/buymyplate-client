import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/list.css'


const SearchInputResults = ({regArr}) => {
    const navigate = useNavigate();



  const handleViewButton = (regId) => {
    console.log("view button clicked")
    navigate('/plate/view/' + regId)
  }

  const handleUpdateButton = (regId) => {
    console.log("update button clicked")
    navigate('/plate/edit/' + regId)
  }

  return (
    <ul className="search-list">
    {regArr.map((reg) => (
    
      <li key={reg.vehicleId} >
        <div>
        <b>{reg?.plateNumber}, {'£'+reg?.price} </b>,
        <span className={`availability ${reg?.available ? 'available' : 'unavailable'}`}>
          {reg?.available ? "available" : "unavailable"}
        </span> 
        </div>
        <div>
        <button className="btn btn-info"onClick={() => handleViewButton(reg.vehicleId)}>View</button> &nbsp; &nbsp;
        <button className="btn btn-warning" onClick={() => handleUpdateButton(reg.vehicleId)}>Update</button>
        </div>
      </li>
    ))}
  </ul>
  )
}

export default SearchInputResults