import React, {useState, useEffect} from 'react'
import { createVehiclePlate, updateVehiclePlate } from '../api/vehiclePlateApi';
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from '../constants';
import memorytags from '../data/dvla_memory_tags.json'
import { useNavigate } from 'react-router-dom';


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
  const [userId, setuserId] = useState(initialData?.userId || null)
  
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

  const navigate = useNavigate();



//   checking to see both plates present
  useEffect(() => {
    const hasStandard = (  selectTag !== "Select Tag") ||( selectedRegion !== "Select Region") || values?.some((v) =>  v);
    const hasCustom = customPlate && customPlate.length > 0;
    setBothPresentError(hasStandard && hasCustom);
  }, [customPlate, values, selectTag, selectedRegion ]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const body = {
        plateNumber: customPlate.length > 0 ? customPlate : selectTag + values[0].trim() + ' ' + values[1].trim(),
        personalised: customPlate.length > 0,
        available: available,
        price: Number(price),
        userId: available ? null: userId,
      };

      try{
        if(mode === 'create'){
            const response = await createVehiclePlate(body); 
            toast.success("New vehicle plate registered!")
            navigate('/plate/view/' + response.vehicleId)
        } else if (mode === 'edit'){
          const response = await updateVehiclePlate(initialData.vehicleId, body)
          if(!response){
            throw Error("Error updating vehicle")
          }
          toast.success("Plate updated successfully!")
            onSubmit?.();
    
        }
      
    
      } catch(error){
        console.log(error)
        toast.error(`Operation failed: ${error.message}`);

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
    userId,
    setuserId,
    renderErrors,
    handleSubmit, 
    personalised,
    setPersonalised
  }
}

export default usePlateform