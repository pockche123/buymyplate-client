import axiosInstance from "../axiosInstance";
import { createVehiclePlate } from "../vehiclePlateApi";

jest.mock('../axiosInstance'); 

describe("createVehiclePlate", () => {
    const mockRequestBody = {plateNumber: "AB12 UJX", available: true, price: 30}
    const mockResponseData = {id: 1, plateNumber: "AB12 UJX", available: true, price: 30}

    beforeEach(() => {
        axiosInstance.post.mockClear();
    })
    it("should make  a POST request to /vehiclePlates with the correct body", async() => {
        // arrange
        axiosInstance.post.mockResolvedValueOnce({data: mockResponseData})

        // act 
        const result = await createVehiclePlate(mockRequestBody)

        // assert
        expect(axiosInstance.post).toHaveBeenCalledTimes(1)
        expect(axiosInstance.post).toHaveBeenCalledWith("/vehiclePlates", mockRequestBody)
        expect(result).toEqual(mockResponseData)
    })
})