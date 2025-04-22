import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import PlateForm from '../components/PlateForm';
import { getVehiclePlatesById } from '../api/vehiclePlateApi';

const ViewPlatePage = () => {
    const {id} = useParams(); 
    const [plateData, setPlateData] = useState(null);
    const [loading, setLoading] = useState(true); 


    useEffect(() => {
        getVehiclePlatesById(id).then(res => {
            setPlateData(res?.data)
            setLoading(false); 
        
      }).catch(e =>{console.log("error fetching vehicle plate by ID: ", e) ;      setLoading(false); })
      
    
    } , [id]);

    if (loading) return <div>Loading...</div>; // Show loader
    if (!plateData) return <div>No data found</div>;



  return (
    <div>
    <PlateForm mode="view" initialData={plateData} />
    </div>

  )
}

export default ViewPlatePage