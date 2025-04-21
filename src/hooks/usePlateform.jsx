import React from 'react'

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


  }




  return (
    <div>usePlateform</div>
  )
}

export default usePlateform