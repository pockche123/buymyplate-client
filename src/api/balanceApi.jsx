import axiosInstance from './axiosInstance.jsx'; 

export const getBalanceByCustomerId = (customerId) => axiosInstance.get("/balance/customerId/" + customerId);

export const updateBalance = (id, body) => axiosInstance.patch(`/balance/${id}`,body)