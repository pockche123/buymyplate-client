import React from "react";
import StandardRegPlateInput from "../components/StandardRegPlateInput";
import { useRef, useState } from "react";
import "../assets/button.css";
import { createVehiclePlate } from "../api/vehiclePlateApi";
// import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const RegisterPlatePage = () => {
  const [values, setValues] = useState(["", "", ""]);
  const [errors, setErrors] = useState([false, false, false]);
  const regplateProps = { values, setValues, errors, setErrors };
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(true);
  let strErrMessage = "Letters only accepted";
  let numErrMessage = "Numbers only accepted";

  const renderErrors = () => {
    if (!errors.some((err) => err)) return null;
    return (
      <>
        <h3>Error Found:</h3>
        {errors[1] ? <li>{numErrMessage}</li> : <li>{strErrMessage}</li>}
      </>
    );
  };

  const handlePriceInput = (e) => {
    const value = e.target.value;

    if (isNaN(value) || !value) {
      return;
    }
    setPrice(value); // Allow empty input or positive numbers
  };

  const handleRegisterStandardPlate = (e) => {
    e.preventDefault();
    const body = {
      plateNumber: values.join('').trim(),
      personalised: false,
      available: available,
      price: Number(price),
      customerId: null
    }
    createVehiclePlate(body)
    .then(res => {
      console.log("Vehicle plate created:", res);
      toast.success("New vehicle plate registered!")
      setValues(["","",""])
      setPrice(0)
      setAvailable(true)
      setErrors([false, false, false])

    })
    .catch(e => {
      console.log(e)
      toast.error("Vehicle plate not registered")
  })
  };

  return (
    <>
      <h3>Register a new pate - Standard</h3>

      {renderErrors()}

      <form onSubmit={handleRegisterStandardPlate}>
        <div className="form-group">
          <label className="inline">Registration number:</label>
          <StandardRegPlateInput props={regplateProps} />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            name="plate-price"
            type="text"
            value={price}
            onChange={handlePriceInput}
          />
        </div>
        <div className="form-group">
          <label>Available: </label>
          <label className="switch">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        {!errors.some((err) => err) ? (
          <button>Register</button>
        ) : (
          <button disabled>Register</button>
        )}
      </form>
    </>
  );
};

export default RegisterPlatePage;
