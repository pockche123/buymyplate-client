import React from "react";
import StandardRegPlateInput from "../components/StandardRegPlateInput";
import { useRef, useState } from "react";
import "../assets/button.css";
import { createVehiclePlate } from "../api/vehiclePlateApi";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bannedWordsData from '../data/banned_words.json'
import RegionDropDown from "../components/RegionDropDown/RegionDropDown";


const RegisterPlatePage = () => {
  const [values, setValues] = useState([ "", ""]);
  const [errors, setErrors] = useState([false, false]);
  const regplateProps = { values, setValues, errors, setErrors };
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  let strErrMessage = "Only letters are allowed.";
  let numErrMessage = "Only numbers are allowed.";
  let bothPlatePresentErrMessage = "A plate cannot be both STANDARD and CUSTOM.";
  let bannedWordMessage = "This registration plate contains restricted or inappropriate content.";
  const[bannedWordFound, setBannedWordFound] = useState(false)
  const [customPlate, setCustomPlate] = useState("");
  const bannedWords = bannedWordsData.banned_words;
  const [selectedRegion, setSelectedRegion] = useState('Select Region');
  const [selectTag, setSelectTag] = useState('Select Tag')
  const [regionTags, setRegionTags] = useState([])
  const regionDropDownProps = {selectTag, setSelectTag, selectedRegion, setSelectedRegion, regionTags, setRegionTags}




  const renderErrors = () => {

    return (
      <>
        {(errors[0] || errors[1] || bannedWordFound || selectTag.length == 0) &&  <h3>Error Found:</h3>}
        {errors[0] && <li>{numErrMessage}</li>}
        {(errors[1]) && <li>{strErrMessage}</li>}
        {values.some((v) => v.trim() !== "") && customPlate.length > 0 && (
          <li>{bothPlatePresentErrMessage}</li>
        )}
        {bannedWordFound &&  <li>{bannedWordMessage}</li>}
      </>
    );
  };

  const handlePriceInput = (e) => {
    const value = e.target.value;

    if (!isNaN(value) || value == "") {
      setPrice(value)
    }
  };

  const handleCustomPlate = (e) => {
    const value = e.target.value.toUpperCase();
    if(bannedWords.includes(value)){
      setBannedWordFound(true)
      return
    } else{
      setBannedWordFound(false)
    }
    

    if (/^[A-Z0-9 ]{0,7}$/.test(value)) {
      setCustomPlate(value);
    }
  };

  const handleRegisterStandardPlate = (e) => {
    e.preventDefault();
      


    const body = {
      plateNumber: customPlate.length > 0 ? customPlate: selectTag + values[0] + ' ' + values[1],
      personalised: false,
      available: available,
      price: Number(price),
      customerId: null,
    };
    createVehiclePlate(body)
      .then((res) => {
        console.log("Vehicle plate created:", res);
        toast.success("New vehicle plate registered!");
        setValues(["", ""]);
        setPrice(0);
        setAvailable(true);
        setErrors([false, false]);
        setSelectedRegion('Select Region')
        setRegionTags([])
        setCustomPlate("")
      })
      .catch((e) => {
        console.log(e);
        toast.error("Vehicle plate not registered");
      });
  };

  const showButton = () => {


    let checkForErrors = !errors.some((err) => err)
    let checkForEmptyReg = (values[0].length == 2 && values[1].length == 3)^ (customPlate.length > 0)
    let checkForTagSelect = selectTag == ''  || selectTag != "Select Tag"
  
    return  checkForErrors &&
       checkForEmptyReg &&  checkForTagSelect &&
      price > 0 ? (
      <button>Register</button>
    ) : (
      <button disabled>Register</button>
    );
  };

  return (
    <>
      <h3>Register a new plate</h3>

      {renderErrors()}



      <form onSubmit={handleRegisterStandardPlate}>
      <div style={{ display: 'flex', gap: '1rem', border:'1px solid red' }}>
          <label className="inline">Registration number:</label>
          <RegionDropDown props={regionDropDownProps}/>
          <StandardRegPlateInput props={regplateProps} />
          <ul>or</ul>
          <div>
            <input
              type="text"
              placeholder="CUSTOM"
              minLength={1}
              maxLength={7}
              value={customPlate}
              onChange={handleCustomPlate}
            />
          </div>
        </div>
       
        <div className="form-group">
          <label>Price:</label>
          <input
            name="plate-price"
            type="text"
            value={price}
            maxLength={8}
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

        {showButton()}
      </form>
    </>
  );
};

export default RegisterPlatePage;
