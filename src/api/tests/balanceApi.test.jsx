import axiosInstance from "../axiosInstance.jsx";
import { getBalanceByCustomerId } from "../balanceApi.jsx";





jest.mock('../axiosInstance');

describe("getBalanceByCustomerId", () => {
    it('should make a GET request to the correct endpoint with customerId', async() => {
        // arrange
        const customerId = 1; 
        const mockResponse = {data: {amount: 200}}; 
        // mock the resolved value
        axiosInstance.get.mockResolvedValue(mockResponse);

        // act
        const response = await getBalanceByCustomerId(customerId);

        // assert 
        expect(axiosInstance.get).toHaveBeenCalledTimes(1);
        expect(axiosInstance.get).toHaveBeenCalledWith(`/balance/customerId/${customerId}`)
        expect(response).toEqual(mockResponse);


})

    it("should handle error properly", async() => {
        // arrange
        const customerId = 2; 
        const error = new Error('Request failed. Customer not found')

        // act
        axiosInstance.get.mockRejectedValue(error)

        // assert
        await expect(getBalanceByCustomerId(customerId)).rejects.toThrow(error)

    } )
})