import React from 'react'
import usePlateform from '../hooks/usePlateform'
import "../assets/button.css";
import "../assets/vehicleplate.css";
import PlateFormCard from './PlateFormCard';
import { useNavigate } from 'react-router-dom';

const PlateForm = ({
    mode = "create",
    initialData = null,
    onSubmit
}) => {
    const form = usePlateform({
        mode,
        initialData,
        onSubmit
    })

    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className="vehicle-plate">
            <div className="card-header position-relative"> 
                <h3 className="text-center mb-0">{form.formTitle}</h3>
                <button className="btn btn-warning btn-warning position-absolute start-0 ms-3" onClick={handleGoBack} style={{ margin: '1em', top: '-20px' }}>
                    Go back
                </button>
            </div>
            <div className="reg-errors">
                {form.renderErrors()}
            </div>
            {

                <PlateFormCard {...form} />

            }
        </div>
    )
}

export default PlateForm