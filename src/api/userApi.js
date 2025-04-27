import axiosInstance from "./axiosInstance";

export const getUserInfo = async() => await axiosInstance("/user/info")