import React from 'react'
import usePlateform from '../hooks/usePlateform'
import "../assets/button.css";
import "../assets/vehicleplate.css";
import PlateFormCard from './PlateFormCard';

const PlateForm = ({
    mode ="create",
    initialData = null, 
    onSubmit
}) => {
    const form = usePlateform({
        mode,
        initialData,
        onSubmit
    })

    

  return (
    <div className="vehicle-plate">
        <h3>{form.formTitle}</h3>
        <div className="reg-errors">
            {form.renderErrors()}
        </div>
        {

            <PlateFormCard {...form}/>
           
        }
        </div>
  )
}

export default PlateForm