import axiosInstance from './axiosInstance';

export const getVehiclePlatesByInput = (input) => axiosInstance.get(`/vehiclePlates/reg/${input}`)

export const createVehiclePlate = (body) => axiosInstance.post('/vehiclePlates', body)

export const updateVehiclePlate = (id, body) => axiosInstance.patch(`/vehiclePlates/${id}`,body)