import React from 'react'
import RegionDropDown from './RegionDropDown/RegionDropDown'
import StandardRegPlateInput from './StandardRegPlateInput'
import AvailabilityToggle from './AvailabilityToggle'
import CustomPlateInput from './CustomPlateInput'
import PriceInput from './PriceInput'
import { useNavigate } from 'react-router-dom'

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
  bothPresentErr

}) => {
    const regionDropDownProps = { mode, selectTag, setSelectTag, selectedRegion, setSelectedRegion };
    const regplateProps = { mode, values, setValues, errors, setErrors };
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
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

      <button 
        type="submit" 
        className={`btn ${price > 0 ? 'btn-secondary' : 'btn-light'}`}
        disabled={!price || errors.some(e => e) || bothPresentErr || ( (selectTag == "Select Tag" || selectedRegion == "SelectRegion") && !customPlate) || mode === 'view' }
      >
        {mode === 'create' ? 'Register' :  mode === 'view'? 'View':'Update'}
        </button>
        &nbsp;
        

    </form>
    &nbsp;
    <button className="btn btn-warning" onClick={handleGoBack} style={{margin: '1em'}}>
    Go back
  </button>
  </>

  )
}

export default PlateFormCard