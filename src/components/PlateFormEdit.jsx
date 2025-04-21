import React from 'react'
import RegionDropDown from './RegionDropDown/RegionDropDown'
import StandardRegPlateInput from './StandardRegPlateInput'
import AvailabilityToggle from './AvailabilityToggle'
import CustomPlateInput from './CustomPlateInput'

const PlateFormEdit = ({
    values, setValues,
  customPlate, setCustomPlate,
  price, setPrice,
  available, setAvailable,
  selectedRegion, setSelectedRegion,
  selectTag, setSelectTag,
  regionTags, setRegionTags,
  handleSubmit,
  errors, setBannedWordFound,
  bannedWordFound,
  bothPresentErr

}) => {
    const regionDropDownProps = { selectTag, setSelectTag, selectedRegion, setSelectedRegion, regionTags, setRegionTags };
    const regplateProps = { values, setValues, errors };

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
        <CustomPlateInput setBannedWordFound={setBannedWordFound} setCustomPlate={setCustomPlate}/>
      </div>

      <PriceInput price={price} setPrice={setPrice} />
      <AvailabilityToggle available={available} setAvailable={setAvailable} />

      <button 
        type="submit" 
        className={`btn ${price > 0 ? 'btn-secondary' : 'btn-light'}`}
        disabled={!price || errors.some(e => e) || bothPresentError}
      >
        {mode === 'create' ? 'Register' : 'Update'}
        </button>


    </form>
  )
}

export default PlateFormEdit