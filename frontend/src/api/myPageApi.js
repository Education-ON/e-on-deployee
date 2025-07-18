import axiosInstance from "./axiosInstance";

export const getMyBoardRequests = () => {
  return axiosInstance.get("/api/user/board-requests/me");
};