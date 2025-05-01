import axiosInstance from "../axiosInstance";
import { createVehiclePlate, updateVehiclePlate } from "../vehiclePlateApi";

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

describe("updateVehiclePlate", () => {
    const mockId = 1; 
    const mockBody = {available: true}

    beforeEach(() => {
        axiosInstance.patch.mockClear();
    })

    it('should make a PATCH request to the correct URL with the body', async() => {
        // arrange
        axiosInstance.patch.mockResolvedValueOnce({data: mockBody})

        // act 
        await updateVehiclePlate(mockId, mockBody)

        // assert 
        expect(axiosInstance.patch).toHaveBeenCalledTimes(1)
        expect(axiosInstance.patch).toHaveBeenCalledWith(
            `/vehiclePlates/${mockId}`,
            mockBody
        )

    })
})