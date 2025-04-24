import axiosInstance from './axiosInstance'; 

export const getBalanceByCustomerId = (customerId) => axiosInstance.get("/balance/customerId/" + customerId);
