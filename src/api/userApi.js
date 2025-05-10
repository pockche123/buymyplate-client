import axiosInstance from "./axiosInstance.js";

export const getUserInfo = async() => await axiosInstance("/user/info")