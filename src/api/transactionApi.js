export const getAllTransactions = (input, page = 0, size = 10) => 
    axiosInstance.get(`/transactions`, {
      params: {
        page,
        size
      }
    });