import React from 'react'
import RegionDropDown from './RegionDropDown/RegionDropDown'
import StandardRegPlateInput from './StandardRegPlateInput'
import AvailabilityToggle from './AvailabilityToggle'
import CustomPlateInput from './CustomPlateInput'
import PriceInput from './PriceInput'

const PlateFormEdit = ({
    mode,
    values, setValues,
  customPlate, setCustomPlate,
  price, setPrice,
  available, setAvailable,
  selectedRegion, setSelectedRegion,
  selectTag, setSelectTag,
  regionTags, setRegionTags,
  handleSubmit,
  errors, setErrors, setBannedWordFound,
  bannedWordFound,
  bothPresentErr

}) => {
    const regionDropDownProps = { selectTag, setSelectTag, selectedRegion, setSelectedRegion, regionTags, setRegionTags };
    const regplateProps = { values, setValues, errors, setErrors };


  return (
    <form onSubmit={handleSubmit}>
        <div className="form-group reg-number">
        <label className="inline"><b>Registration number:</b></label>
        <span>(STANDARD)</span>
        <div className="dropdown license-text">
          <RegionDropDown props={regionDropDownProps} />
          <StandardRegPlateInput props={regplateProps} />
        </div>
        <ul>or</ul>
        <CustomPlateInput setBannedWordFound={setBannedWordFound} customPlate={customPlate} setCustomPlate={setCustomPlate}/>
      </div>

      <PriceInput price={price} setPrice={setPrice} />
      <AvailabilityToggle available={available} setAvailable={setAvailable} />

      <button 
        type="submit" 
        className={`btn ${price > 0 ? 'btn-secondary' : 'btn-light'}`}
        disabled={!price || errors.some(e => e) || bothPresentErr}
      >
        {mode === 'create' ? 'Register' : 'Update'}
        </button>


    </form>
  )
}

export default PlateFormEdit