import axiosInstance from './axiosInstance';


export const getAllTransactions = (page = 0, size = 10) => 
    axiosInstance.get(`/transactions`, {
      params: {
        page,
        size
      }
    });


export const createTransaction = async(body) =>{
    const response = await  axiosInstance.post('/transactions', body); 
    return response.data;
   } 