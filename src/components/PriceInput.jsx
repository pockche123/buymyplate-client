import React from 'react'

const PriceInput = ({price, setPrice}) => {

    const handlePriceInput = (e) => {
        const value = e.target.value;
    
        if (!isNaN(value) || value == "") {
          setPrice(value)
        }
      };


  return (
    <div className="form-group ">
    <label><b>Price:</b></label>
    <input
      name="plate-price"
      className="form-control"
      type="text"
      value={price}
      maxLength={8}
      onChange={handlePriceInput}
    />
  </div>
  )
}

export default PriceInput