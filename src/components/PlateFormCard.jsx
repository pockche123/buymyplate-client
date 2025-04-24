import React from 'react'
import RegionDropDown from './RegionDropDown/RegionDropDown'
import StandardRegPlateInput from './StandardRegPlateInput'
import AvailabilityToggle from './AvailabilityToggle'
import CustomPlateInput from './CustomPlateInput'
import PriceInput from './PriceInput'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { updateVehiclePlate } from '../api/vehiclePlateApi'
import { toast } from 'react-toastify'

const PlateFormCard = ({
    mode,
    values, setValues,
  customPlate, setCustomPlate,
  price, setPrice,
  available, setAvailable,
  selectedRegion, setSelectedRegion,
  selectTag, setSelectTag,
  handleSubmit,
  errors, setErrors, setBannedWordFound,
  bothPresentErr,
  setCustomerId

}) => {
    const regionDropDownProps = { mode, selectTag, setSelectTag, selectedRegion, setSelectedRegion };
    const regplateProps = { mode, values, setValues, errors, setErrors };
    const navigate = useNavigate();
    const params = useParams();
    const vehicleId = params.id; 

    const {user} = useAuth()
    const isCustomer = user?.role === 'CUSTOMER'

    console.log(user)

    const handleGoBack = () => {
        navigate(-1)
    }

    const handlePurchase = () => {
      try {
        const body = {
          available: false,
          customerId: user?.id
        }

        const response = updateVehiclePlate(vehicleId, body)
        toast.success("Congratulations! Reg Plate purchased successfully")
        navigate("/all-purchases")

      } catch (error) {
        toast.error("Error while purchasing: ", error)
        
      }
    }
  


  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="form-group reg-number">
        <label className="inline"><b>Registration number:</b></label>
        <span>(STANDARD)</span>
        <div className="dropdown license-text">
          <RegionDropDown props={regionDropDownProps} />
          <StandardRegPlateInput props={regplateProps} />
        </div>
        <ul>or</ul>
        <CustomPlateInput setBannedWordFound={setBannedWordFound} customPlate={customPlate} setCustomPlate={setCustomPlate} mode={mode}/>
      </div>

      <PriceInput price={price} setPrice={setPrice} mode={mode}/>
      <AvailabilityToggle available={available} setAvailable={setAvailable} mode={mode}/>
      {mode !== 'view' &&

      <button 
        type="submit" 
        className={`btn ${price > 0 ? 'btn-secondary' : 'btn-light'}`}
        disabled={!price || errors.some(e => e) || bothPresentErr || ( (selectTag == "Select Tag" || selectedRegion == "SelectRegion") && !customPlate)  }
      >
        {mode === 'create' ? 'Register' :  mode === 'view'? 'View':'Update'}
        </button>
      }
       
    </form>
    &nbsp;
    <div>

    {
        isCustomer && available && 
        <button type="submit" className="btn btn-info" style={{margin: '1em'}} onClick={handlePurchase}>
        Buy Plate
      </button>

      }
    
    <button className="btn btn-warning" onClick={handleGoBack} style={{margin: '1em'}}>
    Go back
  </button>
  </div>
  </>

  )
}

export default PlateFormCard