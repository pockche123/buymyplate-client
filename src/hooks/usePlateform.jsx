import React, {useState, useEffect} from 'react'
import { createVehiclePlate, updateVehiclePlate } from '../api/vehiclePlateApi';
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from '../constants';
import memorytags from '../data/dvla_memory_tags.json'


const usePlateform = ({mode, initialData, onSubmit}) => {
     // Initialize state from props

  const [customPlate, setCustomPlate] = useState(initialData?.personalised ? initialData?.plateNumber: '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [available, setAvailable] = useState(initialData?.available ?? true);
  const [values, setValues] = useState(!initialData?.personalised ? [initialData?.plateNumber.slice(2,4), initialData?.plateNumber.slice(4)]: ["", ""]);


  const [selectTag, setSelectTag] = useState(
    initialData?.plateNumber && !initialData?.personalised? initialData.plateNumber.slice(0, 2) : "Select Tag"
  );
  
  const getRegionFromTag = (tag) => {
    for (const [region, tags] of Object.entries(memorytags)) {
      if (tags.includes(tag)) {
        return region;
      }
    }
    return 'Select Region'; // Default if tag not found
  };
  
  const [selectedRegion, setSelectedRegion] = useState(() => {
    const tag = !initialData?.personalised && initialData?.plateNumber?.slice(0, 2) || '';
    return getRegionFromTag(tag);
  });

 
  const [personalised, setPersonalised] = useState(initialData?.personalised ||null);
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
    console.log("select tag false", selectTag !== "Select Tag")
    console.log("select region falsy", selectedRegion !== "Select Region")
    console.log("values are not empty" ,values?.some((v) => v !== undefined ))
    console.log("values" , values)
    const hasStandard = (  selectTag !== "Select Tag") ||( selectedRegion !== "Select Region") || values?.some((v) =>  v);
    const hasCustom = customPlate && customPlate.length > 0;
    console.log("both presnet yeah")
    setBothPresentError(hasStandard && hasCustom);
  }, [customPlate, values, selectTag, selectedRegion ]);

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
      {(errors[0] || errors[1] || bannedWordFound || selectTag?.length === 0) && <h5>Error Found!</h5>}
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
    handleSubmit, 
    personalised,
    setPersonalised
  }
}

export default usePlateform