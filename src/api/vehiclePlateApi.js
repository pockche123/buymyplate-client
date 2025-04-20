import axiosInstance from './axiosInstance';

export const getVehiclePlatesByInput = (input) => axiosInstance.get(`/vehiclePlates/reg/${input}`)

export const createVehicle = (body) => axiosInstance.post('/vehicles', body)