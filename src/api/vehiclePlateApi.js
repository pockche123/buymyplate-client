import axiosInstance from './axiosInstance';

export const getVehiclePlatesByInput = async(input, page = 0, size = 5) => 
   await axiosInstance.get(`/vehiclePlates/reg/${input}`, {
     params: {
       page,
       size
     }
   });

export const getVehiclePlatesById = (id) => axiosInstance.get(`/vehiclePlates/${id}`)

export const createVehiclePlate = async(body) =>{
   const response = await  axiosInstance.post('/vehiclePlates', body); 
return response.data;
} 

export const updateVehiclePlate = (id, body) => axiosInstance.patch(`/vehiclePlates/${id}`,body)

export const getVehiclePlatesByCustomerId = (id, page = 0, size = 5
) => axiosInstance.get(`/vehiclePlates/customerId/${id}`, {
   params: {
      page,
      size
   }
})