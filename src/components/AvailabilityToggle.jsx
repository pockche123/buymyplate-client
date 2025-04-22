import React from 'react'

const AvailabilityToggle = ({available, setAvailable}) => {
  return (
    <div className="form-group">
          <label><b>Available: </b></label> &nbsp;
          <label className="switch">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
  )
}

export default AvailabilityToggle