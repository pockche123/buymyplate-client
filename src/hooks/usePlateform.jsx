import React, {useState, useEffect} from 'react'
import { createVehiclePlate, updateVehiclePlate } from '../api/vehiclePlateApi';
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from '../constants';


const usePlateform = ({mode, initialData, onSubmit}) => {
     // Initialize state from props
  const [values, setValues] = useState(initialData?.values || ["", ""]);
  const [customPlate, setCustomPlate] = useState(initialData?.customPlate || "");
  const [price, setPrice] = useState(initialData?.pßßice || '');
  const [available, setAvailable] = useState(initialData?.available ?? true);
  const [selectedRegion, setSelectedRegion] = useState(initialData?.selectedRegion || 'Select Region');
  const [selectTag, setSelectTag] = useState(initialData?.selectTag || 'Select Tag');
  const [regionTags, setRegionTags] = useState(initialData?.regionTags || []);
  const [customerId, setCustomerId] = useState(initialData?.customerId || null)
  
  // Error states
  const [errors, setErrors] = useState([false, false]);
  const [bannedWordFound, setBannedWordFound] = useState(false);
  const [bothPresentError, setBothPresentError] = useState(false);

  // Derived state
  const isViewMode = mode === 'view'; 
  const formTitle = {
    create: 'Register a new plate',
    view: 'Plate Details',
    edit: 'Edit Plate Details'
  }[mode];

//   checking to see both plates present
  useEffect(() => {
    const hasStandard = (selectTag.length > 0 && selectTag !== "Select Tag") || 
      (selectedRegion.length > 0 && selectedRegion !== "Select Region") || 
      values.some((v) => v.trim() !== "");
    const hasCustom = customPlate.length > 0;
    setBothPresentError(hasStandard && hasCustom);
  }, [selectTag, selectedRegion, values, customPlate]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const body = {
        plateNumber: customPlate.length > 0 ? customPlate : selectTag + values[0] + ' ' + values[1],
        personalised: customPlate.length > 0,
        available: available,
        price: Number(price),
        customerId: customerId,
      };

      try{
        if(mode === 'create'){
            await createVehiclePlate(body); 
            toast.success("New vehicle plate registered!")
            resetForm();
        } else if (mode === 'edit'){
            await updateVehiclePlate(initialData.id, body); 
            toast.success("Plate updated successfully!")
    
        }
        onSubmit?.();
    
      } catch(error){
        console.log(error)
        toast.error(`Operation failed: ${error.message}`);

      }

  }

  const resetForm = () => {
    if (mode === 'create') {
        setValues(["", ""]);
        setPrice('');
        setAvailable(true);
        setCustomPlate("");
        setSelectedRegion('Select Region');
        setSelectTag('Select Tag');
      }
  }

  const renderErrors = () => (
    <div className="error-block">
      {(errors[0] || errors[1] || bannedWordFound || selectTag.length === 0) && <h5>Error Found!</h5>}
      {errors[0] && <li>{ERROR_MESSAGES.number}</li>}
      {errors[1] && <li>{ERROR_MESSAGES.string}</li>}
      {bothPresentError && <li>{ERROR_MESSAGES.bothPresent}</li>}
      {bannedWordFound && <li>{ERROR_MESSAGES.bannedWord}</li>}
    </div>
  );




  return {
    mode,
    values,
    setValues,
    customPlate,
    setCustomPlate,
    price,
    setPrice,
    available,
    setAvailable,
    selectedRegion,
    setSelectedRegion,
    selectTag,
    setSelectTag,
    regionTags,
    setRegionTags,
    errors,
    setErrors,
    bannedWordFound,
    setBannedWordFound,
    bothPresentError,
    formTitle,
    isViewMode,
    customerId,
    setCustomerId,
    renderErrors,
    handleSubmit
  }
}

export default usePlateform