import React from 'react'
import usePlateform from '../hooks/usePlateform'
import "../assets/button.css";
import "../assets/vehicleplate.css";
import PlateFormEdit from './PlateFormEdit';
import PlateFormView from './PlateFormView';

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
            mode === 'view' ? (
                <PlateFormView {...form}/>
            ): (
                <PlateFormEdit {...form}/>
            )
        }
        </div>
  )
}

export default PlateForm