import axiosInstance from './axiosInstance';


export const getAllTransactions = (page = 0, size = 10) => 
    axiosInstance.get(`/transactions`, {
      params: {
        page,
        size
      }
    });