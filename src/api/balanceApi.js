import axiosInstance from './axiosInstance'; 

const getBalanceByCustomerId = (customerId) => {
    axiosInstance.get("/balance/" + customerId)
}