import axiosInstance from './axiosInstance';

export const getVehiclePlatesByInput = (input) => axiosInstance.get(`/vehiclePlates/reg/${input}`)